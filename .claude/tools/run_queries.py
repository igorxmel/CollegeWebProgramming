"""Прогнать schema.sql, data.sql и queries.sql и показать результат каждого запроса.

MySQL-сервера на машине нет, поэтому проверка идёт на SQLite: диалект отличается
только в объявлении таблиц, а сами запросы из queries.sql выполняются как есть.
Если запрос пройдёт здесь, синтаксической ошибки в нём нет и выборка осмысленная.

Usage:
    python .claude/tools/run_queries.py            # результаты в консоль
    python .claude/tools/run_queries.py --markdown # готовые таблицы для README
"""

import argparse
import io
import re
import sqlite3
import sys
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

SOLUTION = Path(__file__).resolve().parents[2] / "Task 5th SQL Queries" / "Solution"


def to_sqlite(sql: str) -> str:
    """Перевести DDL из диалекта MySQL в SQLite. Запросов не касается."""
    sql = re.sub(r"(?im)^\s*(DROP|CREATE)\s+DATABASE[^;]*;", "", sql)
    sql = re.sub(r"(?im)^\s*USE\s+\w+\s*;", "", sql)
    sql = re.sub(r"INT\s+AUTO_INCREMENT\s+PRIMARY KEY", "INTEGER PRIMARY KEY AUTOINCREMENT", sql)
    sql = re.sub(r"TINYINT\(\d+\)", "INTEGER", sql)
    sql = re.sub(r"DECIMAL\(\d+,\s*\d+\)", "REAL", sql)
    sql = sql.replace("DATETIME", "TEXT")
    return sql


def split_statements(sql: str) -> list[tuple[str, str]]:
    """Разбить queries.sql на пары (комментарий-заголовок, текст запроса)."""
    sql = re.sub(r"(?im)^\s*USE\s+\w+\s*;", "", sql)
    out, title, buf = [], "", []
    for line in sql.splitlines():
        stripped = line.strip()
        if stripped.startswith("--"):
            text = stripped.lstrip("- ").strip()
            if re.match(r"^\d+\.", text):
                title = text
            continue
        buf.append(line)
        if stripped.endswith(";"):
            body = "\n".join(buf).strip()
            if body:
                out.append((title, body))
            buf = []
    return out


def table(rows, header) -> list[str]:
    if not rows:
        return ["  (пусто)"]
    widths = [max(len(str(h)), *(len(str(r[i])) for r in rows)) for i, h in enumerate(header)]
    line = "  " + " | ".join(str(h).ljust(w) for h, w in zip(header, widths))
    sep = "  " + "-+-".join("-" * w for w in widths)
    body = ["  " + " | ".join(str(v).ljust(w) for v, w in zip(r, widths)) for r in rows]
    return [line, sep] + body


def md_table(rows, header) -> list[str]:
    if not rows:
        return ["", "Запрос не возвращает строк.", ""]
    out = ["", "| " + " | ".join(str(h) for h in header) + " |",
           "|" + "|".join("---" for _ in header) + "|"]
    out += ["| " + " | ".join(str(v) for v in r) + " |" for r in rows]
    out.append("")
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--markdown", action="store_true")
    args = ap.parse_args()

    con = sqlite3.connect(":memory:")
    con.execute("PRAGMA foreign_keys = ON")
    for name in ("schema.sql", "data.sql"):
        con.executescript(to_sqlite((SOLUTION / name).read_text(encoding="utf-8")))

    statements = split_statements((SOLUTION / "queries.sql").read_text(encoding="utf-8"))
    ok = 0
    for title, body in statements:
        cur = con.cursor()
        try:
            cur.execute(body)
        except sqlite3.Error as exc:
            print(f"\nОШИБКА в «{title}»: {exc}\n{body}")
            continue
        ok += 1
        if args.markdown:
            print(f"**{title}**")
            print()
            print("```sql")
            print(body)
            print("```")
        else:
            print(f"\n--- {title}")
        if cur.description:
            header = [d[0] for d in cur.description]
            rows = cur.fetchall()
            printer = md_table if args.markdown else table
            print("\n".join(printer(rows, header)))
        else:
            msg = f"изменено строк: {cur.rowcount}"
            print(f"\n{msg}\n" if args.markdown else f"  {msg}")
    con.commit()

    if not args.markdown:
        print(f"\nвыполнено без ошибок: {ok} из {len(statements)}")


if __name__ == "__main__":
    main()
