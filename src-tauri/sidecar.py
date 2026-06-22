import sys
import json

def main():
    response = {
        "status": "ok",
        "message": "hello from python"
    }
    print(json.dumps(response))
    sys.stdout.flush()

if __name__ == "__main__":
    main()