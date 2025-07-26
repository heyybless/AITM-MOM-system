const express = require('express');
const User = require('../models/User');
const Meeting = require('../models/Meeting');
const router = express.Router();

// Database dashboard route
router.get('/dashboard', async (req, res) => {
    try {
        // Get database statistics
        const userCount = await User.countDocuments();
        const meetingCount = await Meeting.countDocuments();
        
        // Get users (without passwords)
        const users = await User.find({}, '-password').sort({ createdAt: -1 });
        
        // Get meetings with populated data
        const meetings = await Meeting.find({})
            .populate('organizer', 'name email role')
            .populate('attendees.user', 'name email role')
            .sort({ createdAt: -1 });

        // Count users by role
        const roleStats = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        // Count meetings by status
        const statusStats = await Meeting.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const dashboardData = {
            statistics: {
                totalUsers: userCount,
                totalMeetings: meetingCount,
                roleBreakdown: roleStats,
                statusBreakdown: statusStats
            },
            users: users,
            meetings: meetings,
            timestamp: new Date().toISOString()
        };

        // Return HTML dashboard
        res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AITM MOM - Database Dashboard</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            color: #2d3748;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        .stat-label {
            color: #718096;
            font-weight: 500;
        }
        .section {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .section-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
        }
        .data-table th,
        .data-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        .data-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #4a5568;
        }
        .role-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .role-administrator { background: #fed7d7; color: #c53030; }
        .role-principal { background: #fef5e7; color: #d69e2e; }
        .role-hod { background: #e6fffa; color: #319795; }
        .role-faculty { background: #ebf8ff; color: #3182ce; }
        .refresh-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
        }
        .refresh-btn:hover {
            background: #5a67d8;
        }
        .timestamp {
            text-align: center;
            color: #718096;
            font-size: 0.9rem;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <button class="refresh-btn" onclick="location.reload()">🔄 Refresh</button>
    
    <div class="dashboard">
        <div class="header">
            <h1>🎓 AITM MOM Database Dashboard</h1>
            <p>Real-time view of your application data</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${dashboardData.statistics.totalUsers}</div>
                <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${dashboardData.statistics.totalMeetings}</div>
                <div class="stat-label">Total Meetings</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${dashboardData.statistics.roleBreakdown.length}</div>
                <div class="stat-label">Active Roles</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${dashboardData.statistics.statusBreakdown.length || 0}</div>
                <div class="stat-label">Meeting Statuses</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">👥 Users</h2>
            ${dashboardData.users.length > 0 ? `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    ${dashboardData.users.map(user => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td><span class="role-badge role-${user.role}">${user.role}</span></td>
                        <td>${user.department || '-'}</td>
                        <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            ` : '<p>No users found</p>'}
        </div>

        <div class="section">
            <h2 class="section-title">📅 Meetings</h2>
            ${dashboardData.meetings.length > 0 ? `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Organizer</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Attendees</th>
                    </tr>
                </thead>
                <tbody>
                    ${dashboardData.meetings.map(meeting => `
                    <tr>
                        <td>${meeting.title}</td>
                        <td>${meeting.organizer?.name || 'Unknown'}</td>
                        <td>${new Date(meeting.date).toLocaleDateString()}</td>
                        <td><span class="role-badge role-${meeting.status}">${meeting.status}</span></td>
                        <td>${meeting.attendees.length}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            ` : '<p>No meetings found</p>'}
        </div>

        <div class="timestamp">
            Last updated: ${new Date(dashboardData.timestamp).toLocaleString()}
        </div>
    </div>
</body>
</html>
        `);

    } catch (error) {
        console.error('Database dashboard error:', error);
        res.status(500).json({ 
            error: 'Failed to load database dashboard',
            message: error.message 
        });
    }
});

// JSON API endpoint for database data
router.get('/api/stats', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const meetingCount = await Meeting.countDocuments();
        
        const roleStats = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        const statusStats = await Meeting.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        res.json({
            statistics: {
                totalUsers: userCount,
                totalMeetings: meetingCount,
                roleBreakdown: roleStats,
                statusBreakdown: statusStats
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Database stats error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch database statistics',
            message: error.message 
        });
    }
});

module.exports = router;
