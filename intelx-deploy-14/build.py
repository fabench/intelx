#!/usr/bin/env python3
"""
intelX build script
───────────────────
Run this to produce a ready-to-deploy index.html.
Just drag that file to Netlify drop.

Usage:
    python build.py

You will be prompted for:
  - Anthropic API key
  - Users to add (username + password pairs)

The script hashes passwords with SHA-256 and injects everything
into polintel.html → outputs index.html ready for Netlify drag-and-drop.
"""

import hashlib, json, getpass, shutil, re, sys, os

SRC = "polintel.html"
OUT = "index.html"
USERS_FILE = "users.json"  # persisted so you don't re-enter every time

def sha256(s):
    return hashlib.sha256(s.encode()).hexdigest()

def load_saved_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE) as f:
            return json.load(f)
    return []

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)
    print(f"  Users saved to {USERS_FILE}")

def print_users(users):
    if not users:
        print("  (no users yet)")
        return
    for u in users:
        print(f"  • {u['u']}")

def manage_users(users):
    while True:
        print("\n── User management ──────────────────────")
        print_users(users)
        print()
        print("  [a] Add user")
        print("  [d] Delete user")
        print("  [r] Reset password")
        print("  [done] Continue to build")
        choice = input("\nAction: ").strip().lower()

        if choice in ('done', ''):
            if not users:
                print("  ⚠  You need at least one user to access the platform.")
                continue
            break

        elif choice == 'a':
            username = input("  Username: ").strip().lower()
            if not username or not re.match(r'^[a-z0-9_-]{2,}$', username):
                print("  ✗ Invalid username (min 2 chars, a-z 0-9 _ -)")
                continue
            if any(u['u'] == username for u in users):
                print(f"  ✗ User '{username}' already exists")
                continue
            password = getpass.getpass("  Password: ")
            if len(password) < 6:
                print("  ✗ Password must be at least 6 characters")
                continue
            confirm = getpass.getpass("  Confirm password: ")
            if password != confirm:
                print("  ✗ Passwords don't match")
                continue
            users.append({'u': username, 'h': sha256(f"{username}:{password}")})
            save_users(users)
            print(f"  ✓ User '{username}' added")

        elif choice == 'd':
            username = input("  Delete username: ").strip().lower()
            before = len(users)
            users[:] = [u for u in users if u['u'] != username]
            if len(users) < before:
                save_users(users)
                print(f"  ✓ User '{username}' deleted")
            else:
                print(f"  ✗ User '{username}' not found")

        elif choice == 'r':
            username = input("  Reset password for: ").strip().lower()
            u = next((x for x in users if x['u'] == username), None)
            if not u:
                print(f"  ✗ User '{username}' not found")
                continue
            password = getpass.getpass("  New password: ")
            if len(password) < 6:
                print("  ✗ Password must be at least 6 characters")
                continue
            u['h'] = sha256(f"{username}:{password}")
            save_users(users)
            print(f"  ✓ Password reset for '{username}'")

        else:
            print("  ✗ Unknown option")

    return users

def main():
    print("━" * 50)
    print("  intelX — Build tool")
    print("━" * 50)

    # Check source file
    if not os.path.exists(SRC):
        print(f"\n✗ Source file '{SRC}' not found.")
        print("  Make sure you run this script from the intelx-deploy folder.")
        sys.exit(1)

    # API Key
    print("\n── Anthropic API key ────────────────────")
    saved_key = ""
    key_file = ".apikey"
    if os.path.exists(key_file):
        with open(key_file) as f:
            saved_key = f.read().strip()
        print(f"  Saved key found: {saved_key[:12]}…")
        use_saved = input("  Use this key? [Y/n]: ").strip().lower()
        if use_saved not in ('n', 'no'):
            api_key = saved_key
        else:
            api_key = ""
    else:
        api_key = ""

    if not api_key:
        api_key = input("  Enter your Anthropic API key (sk-ant-...): ").strip()
        if not api_key.startswith('sk-ant-'):
            print("  ⚠  Key doesn't look right (should start with sk-ant-)")
        save_key = input("  Save key for future builds? [Y/n]: ").strip().lower()
        if save_key not in ('n', 'no'):
            with open(key_file, 'w') as f:
                f.write(api_key)
            print(f"  Saved to {key_file} (keep this file private, don't commit it)")

    # Users
    print("\n── Users ────────────────────────────────")
    users = load_saved_users()
    if users:
        print(f"  {len(users)} saved user(s):")
        print_users(users)
        edit = input("  Edit users? [y/N]: ").strip().lower()
        if edit in ('y', 'yes'):
            users = manage_users(users)
    else:
        print("  No users found. Add at least one:")
        users = manage_users(users)

    # Build
    print("\n── Building ─────────────────────────────")
    with open(SRC, 'r', encoding='utf-8') as f:
        html = f.read()

    users_json = json.dumps(users)
    html = html.replace('%%INTELX_USERS%%', users_json)
    html = html.replace('%%ANTHROPIC_KEY%%', api_key)

    # Sanity check
    if '%%' in html:
        remaining = re.findall(r'%%[^%]+%%', html)
        print(f"  ⚠  Unreplaced placeholders: {remaining}")

    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(html)

    size_kb = os.path.getsize(OUT) // 1024
    print(f"  ✓ Built {OUT} ({size_kb} KB)")
    print(f"  ✓ {len(users)} user(s) embedded")
    print(f"  ✓ API key injected")
    print()
    print("━" * 50)
    print("  READY — drag index.html to Netlify Drop")
    print("  netlify.com/drop")
    print("━" * 50)

if __name__ == '__main__':
    main()
