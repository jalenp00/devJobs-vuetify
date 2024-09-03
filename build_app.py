import subprocess
import os
import sys

def run_command(command, cwd=None, shell=False):
    """Run a command in a subprocess."""
    try:
        subprocess.run(command, cwd=cwd, shell=shell, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while running command: {e}")
        sys.exit(1)

def is_mongodb_running():
    """Check if MongoDB is already running."""
    try:
        # pgrep returns the process ID if the process is running
        result = subprocess.run(["pgrep", "mongod"], stdout=subprocess.PIPE)
        return result.returncode == 0  # If return code is 0, MongoDB is running
    except Exception as e:
        print(f"Error checking MongoDB status: {e}")
        return False

def main():
    # Start frontend services
    print("Starting frontend services...")
    try:
        # Run `npm run serve` in the frontend directory
        run_command("npm run serve", cwd="frontend", shell=True)
        
        # Run `node server.js` in the frontend directory
        run_command("node server.js", cwd="frontend/node", shell=True)
    
    except KeyboardInterrupt:
        print("Frontend services interrupted.")

    # Start backend service
    print("Starting backend service...")
    try:
        run_command("uvicorn main:app --reload --port 8000", cwd="backend", shell=True)
    except KeyboardInterrupt:
        print("Backend service interrupted.")

    # Check if MongoDB is running and start it if not
    if is_mongodb_running():
        print("MongoDB is already running.")
    else:
        print("Starting MongoDB...")
        try:
            # Open a new terminal and run `mongosh`
            if sys.platform == "darwin":  # Check if the OS is macOS
                subprocess.Popen(["osascript", "-e", 'tell application "Terminal" to do script "mongosh"'])
            else:
                print("This script is designed for macOS. MongoDB startup command might need adjustment for other OS.")
        except Exception as e:
            print(f"Error occurred while starting MongoDB: {e}")

if __name__ == "__main__":
    main()
