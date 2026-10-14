import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field"><label>SQL</label>
      <textarea id="in" placeholder="select id, name from users where age > 18 order by name">select id, name, email from users where age > 18 and active = 1 order by created_at desc limit 10</textarea>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run">${t("tool.run")}</button>
      <button class="btn" id="copy">${t("tool.copy")}</button>
      <button class="btn" id="clear">${t("tool.clear")}</button>
    </div>
    <div class="field" style="margin-top:10px"><label>${t("tool.output")}</label>
      <div class="output" id="out" aria-live="polite"></div>
    </div>
  `;
  const input = root.querySelector("#in");
  const out = root.querySelector("#out");

  const KEYWORDS = ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET", "UNION ALL", "UNION", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN", "OUTER JOIN", "CROSS JOIN", "JOIN", "ON", "AND", "OR", "NOT", "IN", "IS NULL", "IS NOT NULL", "LIKE", "BETWEEN", "AS", "DISTINCT", "COUNT", "SUM", "AVG", "MIN", "MAX", "CASE", "WHEN", "THEN", "ELSE", "END", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "PRIMARY KEY", "FOREIGN KEY", "REFERENCES", "NULL", "ASC", "DESC"];
  const MAJOR = new Set(["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET", "UNION", "UNION ALL", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"]);

  function format(sql) {
    // protect strings
    const strs = [];
    sql = sql.replace(/'(?:[^']|'')*'/g, m => { strs.push(m); return `\u0000${strs.length - 1}\u0000`; });

    // uppercase keywords (longest first)
    const sorted = [...KEYWORDS].sort((a, b) => b.length - a.length);
    for (const kw of sorted) {
      sql = sql.replace(new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi"), kw);
    }

    // newline before major clauses
    for (const kw of MAJOR) {
      sql = sql.replace(new RegExp(`\\s*\\b${kw.replace(/ /g, "\\s+")}\\b`, "g"), `\n${kw}`);
    }

    // indent conditions under WHERE/AND/OR
    sql = sql.replace(/\n(AND|OR)\b/g, "\n  $1");
    // comma columns in SELECT list
    sql = sql.replace(/,(?!\s*\n)/g, ",\n       ");

    sql = sql.replace(/\u0000(\d+)\u0000/g, (_, i) => strs[+i]);
    return sql.trim();
  }

  root.querySelector("#run").onclick = () => {
    if (!input.value.trim()) return;
    out.textContent = format(input.value);
  };
  root.querySelector("#copy").onclick = () => {
    if (!out.textContent) return;
    navigator.clipboard.writeText(out.textContent); toastSuccess(t("tool.copied"));
  };
  root.querySelector("#clear").onclick = () => { input.value = ""; out.textContent = ""; };
}
