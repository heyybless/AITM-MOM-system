#!/bin/bash

echo "🛑 Stopping AITM MOM Server..."

# Check if PID file exists
if [ -f server.pid ]; then
    PID=$(cat server.pid)
    echo "📊 Found server PID: $PID"
    
    # Kill the process
    if kill $PID 2>/dev/null; then
        echo "✅ Server stopped successfully"
        rm -f server.pid
    else
        echo "⚠️  Process $PID not found, cleaning up..."
        rm -f server.pid
    fi
else
    echo "⚠️  PID file not found, checking for running processes..."
fi

# Kill any remaining processes on port 3000
REMAINING_PIDS=$(lsof -ti:3000 2>/dev/null)
if [ ! -z "$REMAINING_PIDS" ]; then
    echo "🧹 Cleaning up remaining processes on port 3000..."
    echo $REMAINING_PIDS | xargs kill -9 2>/dev/null
    echo "✅ All processes stopped"
else
    echo "✅ No processes running on port 3000"
fi
