#!/bin/bash

echo "🚀 Starting AITM MOM Server..."

# Check if server is already running
if lsof -ti:3000 > /dev/null; then
    echo "⚠️  Server is already running on port 3000"
    echo "📍 Access your application at: http://localhost:3000"
    echo "🗄️  Database dashboard at: http://localhost:3000/db/dashboard"
    exit 0
fi

# Start the server
echo "🔧 Starting Node.js server..."
nohup node index.js > server.log 2>&1 & 
echo $! > server.pid

# Wait a moment for startup
sleep 3

# Check if server started successfully
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server started successfully!"
    echo "📍 Access your application at: http://localhost:3000"
    echo "🗄️  Database dashboard at: http://localhost:3000/db/dashboard"
    echo "📊 Server PID: $(cat server.pid)"
    echo "📝 Server logs: tail -f server.log"
else
    echo "❌ Server failed to start. Check server.log for details."
    cat server.log
fi
