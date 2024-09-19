cd "$(dirname "$0")";
chromium-browser --start-maximized --start-fullscreen file://$(pwd)/index.html
