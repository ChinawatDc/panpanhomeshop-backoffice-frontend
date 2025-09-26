#!/bin/bash

BASE_DIR="src/app"

# ===== ⚖️ Law System =====
mkdir -p $BASE_DIR/law/cases $BASE_DIR/law/contracts $BASE_DIR/law/consultation $BASE_DIR/law/knowledge $BASE_DIR/law/workflow $BASE_DIR/law/compliance

# ===== 📱 CRM & Member =====
mkdir -p $BASE_DIR/crm/members $BASE_DIR/crm/loyalty $BASE_DIR/crm/marketing

# ===== 🏢 HR =====
mkdir -p $BASE_DIR/hr/employees $BASE_DIR/hr/attendance $BASE_DIR/hr/payroll $BASE_DIR/hr/review

# ===== 💰 Finance =====
mkdir -p $BASE_DIR/finance/transactions $BASE_DIR/finance/reports $BASE_DIR/finance/invoices

# ===== 🔒 Security =====
mkdir -p $BASE_DIR/security/iam $BASE_DIR/security/privacy $BASE_DIR/security/dpo-tools

# ===== 🌐 Portal =====
mkdir -p $BASE_DIR/portal/website $BASE_DIR/portal/blog $BASE_DIR/portal/kb $BASE_DIR/portal/lang

# ===== Create page.tsx in each folder =====
for dir in $(find $BASE_DIR -type d); do
  FILE="$dir/page.tsx"
  if [ ! -f "$FILE" ]; then
    echo "'use client';

export default function Page() {
  return (
    <div>
      <h1>${dir#"$BASE_DIR/"}</h1>
      <p>This is the ${dir#"$BASE_DIR/"} page.</p>
    </div>
  );
}
" > "$FILE"
    echo "✅ Created $FILE"
  fi
done
