#!/bin/bash

echo "========================================"
echo "AgroEase Server Startup Script"
echo "========================================"
echo ""

echo "Starting Backend Server..."
echo ""
cd server && npm run dev &
BACKEND_PID=$!

echo "Waiting 3 seconds for backend to initialize..."
sleep 3

echo ""
echo "Starting Frontend Server..."
echo ""
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Both servers are starting..."
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "========================================"

# Wait for user to press Ctrl+C
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
