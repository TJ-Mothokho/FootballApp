Create a complete frontend web application called "Football Intelligence".

IMPORTANT:
I have attached a generated OpenAPI/TypeScript SDK for the backend.

Treat the attached SDK as READ-ONLY.

DO NOT:
- Modify the SDK
- Redesign or rewrite the SDK
- Add endpoints to the SDK
- Invent API methods that don't exist
- Assume backend functionality that isn't represented by the SDK

Use the SDK to understand:
- Available entities
- Available API operations
- Request parameters
- Response models
- Relationships between entities
- Available statistics
- Available dashboard/analytics operations

The frontend should be designed around what the API actually provides.

This is a private football analysis/data-management application. It is NOT a public football website.

The application is used by one analyst to:
- Maintain football data
- Enter match data
- Enter team match statistics
- Enter player match statistics
- Analyse teams
- Analyse players
- Analyse competitions
- Analyse seasons
- Review matches
- Generate/use analytical information

The priority is PRODUCTIVITY.

The application should feel like a professional internal analytics tool rather than a marketing website.

==================================================
DESIGN LANGUAGE
==================================================

Style:

- Modern
- Minimal
- Clean
- Professional
- Data-dense without feeling cluttered
- Plenty of whitespace
- Rounded cards
- Subtle borders
- Subtle shadows
- Excellent typography hierarchy
- Light theme by default
- Dark mode
- Responsive
- Keyboard-friendly
- Fast to navigate
- Designed for repeated daily use

Visual inspiration:

- Linear
- Vercel Dashboard
- GitHub
- Notion
- Modern sports analytics platforms

Avoid:

- Huge hero sections
- Marketing-style landing pages
- Excessive gradients
- Giant decorative illustrations
- Consumer-facing sports-news aesthetics
- Excessive animations

This should look like software an analyst actually works in for hours.

==================================================
APPLICATION STRUCTURE
==================================================

Create a persistent application shell.

LEFT SIDEBAR

Primary navigation:

Dashboard
Competitions
Seasons
Teams
Players
Matches
Team Match Stats
Player Match Stats
Reports
Settings

Sidebar should support:

- Collapsed mode
- Expanded mode
- Tooltips when collapsed
- Active navigation state
- Icons
- Clear visual hierarchy

TOP BAR

Include:

- Global search
- Current competition selector
- Current season selector
- Theme toggle
- Notifications
- User/profile menu

The selected Competition + Season should feel like GLOBAL application context.

For example:

Betway Premiership
2026/2027

This context should visually appear throughout the application where relevant.

==================================================
DASHBOARD
==================================================

Create a primary League Dashboard.

Header:

Football Intelligence

Current context:

Betway Premiership
2026/2027

Quick actions:

+ New Match
+ Team Match Stats
+ Player Match Stats

--------------------------------------------------
OVERVIEW CARDS
--------------------------------------------------

Display cards for:

Matches Played
Goals
Average Goals / Match
Teams
Players
Current Matchweek

Use realistic placeholder data for the visual prototype.

--------------------------------------------------
GOALS / MATCHWEEK
--------------------------------------------------

Large line chart:

Goals by Matchweek

X axis:
Matchweek

Y axis:
Goals

Use a professional analytics-style chart.

--------------------------------------------------
RESULT DISTRIBUTION
--------------------------------------------------

Chart showing:

Home Wins
Draws
Away Wins

--------------------------------------------------
TOP SCORING TEAMS
--------------------------------------------------

Horizontal bar chart.

--------------------------------------------------
FORM TABLE
--------------------------------------------------

Professional football standings-style table.

Columns:

Position
Team
Played
Won
Drawn
Lost
GF
GA
GD
Points
Form

Use small W/D/L indicators for form.

--------------------------------------------------
RECENT MATCHES
--------------------------------------------------

Table:

Date
Home Team
Score
Away Team
Status

Include team badges/logos as visual placeholders.

--------------------------------------------------
UPCOMING FIXTURES
--------------------------------------------------

Cards/table:

Date
Home Team
Away Team
Kickoff
Venue

--------------------------------------------------
TOP PERFORMERS
--------------------------------------------------

Cards for:

Top Scorer
Top Assists
Highest Rated
Most Minutes
Most Passes

==================================================
COMPETITIONS
==================================================

Create a competition management page.

Table:

Competition
Current Season
Teams
Matches
Status

Example:

Betway Premiership
2026/2027
16 teams
240 matches
Active

Competition detail page should contain:

Competition header

Competition name
Season
Number of teams
Matches played

Tabs:

Overview
Standings
Fixtures
Results
Statistics
Top Scorers

==================================================
SEASONS
==================================================

Create a season management page.

Table:

Season
Competition
Status
Matches
Teams

Example:

2026/2027
Betway Premiership
Active

Season detail page:

Season Overview

Matches
Teams
Players
Goals
Average Goals

Fixtures
Results
Standings
Statistics

==================================================
TEAMS
==================================================

Create a professional team management page.

Table:

Team
Competition
Season
Coach
Stadium
Matches
Wins
Draws
Losses
Goals

Team detail page:

--------------------------------------------------
TEAM HEADER
--------------------------------------------------

Team badge

Orlando Pirates

Competition:
Betway Premiership

Season:
2026/2027

Coach

Captain

Stadium

City

Preferred Formation

Playing Style

--------------------------------------------------
TEAM STATISTICS
--------------------------------------------------

Cards:

Matches Played
Wins
Draws
Losses
Goals Scored
Goals Conceded
Goal Difference
xG
Possession
Pass Accuracy

--------------------------------------------------
TEAM CHARTS
--------------------------------------------------

Goals Timeline

Results / Form

Possession Trend

Pass Accuracy Trend

Shots Trend

xG Trend

--------------------------------------------------
TEAM LEADERS
--------------------------------------------------

Top Scorers

Top Assist Providers

Most Minutes

Most Passes

Most Chances Created

--------------------------------------------------
RECENT MATCHES
--------------------------------------------------

Professional match table.

==================================================
PLAYERS
==================================================

Create a player management page.

Table:

Player
Team
Position
Matches
Minutes
Goals
Assists
Rating

Filters:

Team
Position
Season

Player detail page:

--------------------------------------------------
PLAYER HEADER
--------------------------------------------------

Player photo placeholder

Player name

Team

Position

Age

Nationality

--------------------------------------------------
PLAYER STATISTICS
--------------------------------------------------

Matches

Minutes

Goals

Assists

Average Rating

xG

xA

Pass Accuracy

Chances Created

--------------------------------------------------
PLAYER ANALYTICS
--------------------------------------------------

Rating Trend

Goals Timeline

Minutes Trend

Pass Accuracy

Touches

Chances Created

Radar Chart

Heatmap placeholder

--------------------------------------------------
MATCH HISTORY
--------------------------------------------------

Table:

Match
Date
Opponent
Minutes
Rating
Goals
Assists
MOTM

--------------------------------------------------
PLAYER REVIEW
--------------------------------------------------

Large analytical review panel.

Example:

"Performance Summary"

Allow several paragraphs of analytical text.

==================================================
MATCHES
==================================================

Create a match management page.

Table:

Date
Competition
Season
Home Team
Score
Away Team
Venue
Status

Filters:

Competition
Season
Team
Status
Date

Match detail page:

--------------------------------------------------
MATCH HEADER
--------------------------------------------------

Home Team

2 - 1

Away Team

Date
Kickoff
Venue
Referee
Attendance
Status

--------------------------------------------------
MATCH SUMMARY
--------------------------------------------------

Possession

Shots

Shots on Target

xG

Pass Accuracy

Corners

Fouls

Cards

--------------------------------------------------
TEAM PERFORMANCE
--------------------------------------------------

Home Team Stats

vs

Away Team Stats

--------------------------------------------------
PLAYER PERFORMANCES
--------------------------------------------------

Player table:

Player
Team
Minutes
Rating
Goals
Assists
MOTM

--------------------------------------------------
MATCH ANALYSIS
--------------------------------------------------

Analyst notes / performance summary.

==================================================
TEAM MATCH STATS
==================================================

Create a data-management page specifically for entering team match statistics.

This page must prioritize SPEED.

Use:

- Searchable dropdowns
- Compact inputs
- Grouped sections
- Keyboard-friendly forms
- Sticky save bar
- Clear validation
- Save
- Save & Next
- Cancel

Sections:

General

Attack

Possession

Passing

Defending

Discipline

Goalkeeping

Match Analysis

Do not make this look like a generic web form.

It should feel like an analyst entering structured match data.

==================================================
PLAYER MATCH STATS
==================================================

Create a highly productive player-stat entry interface.

Context:

Match
Team
Player

Player status:

Started
Captain
Man of the Match
Subbed On
Subbed Off

Sections:

General

Attack

Passing

Defending

Duels

Discipline

Goalkeeping

Analyst Notes

Performance Summary

Goalkeeper-specific statistics should only appear when the selected player's position is Goalkeeper.

Include:

Save

Save & Next Player

Cancel

Show progress such as:

Player 4 of 22

This should be one of the most productivity-focused screens in the application.

==================================================
REPORTS
==================================================

Create a reports/analysis workspace.

Cards:

Match Review
Match Preview
Team Review
Player Review
Season Summary
NotebookLM Export

Each report card should show:

Title
Description
Last generated
Generate button

Report detail page should support:

- Generated analysis
- Copy
- Export
- Regenerate

Do NOT invent backend functionality.

This is primarily a UI representation of the reporting workflow.

==================================================
GLOBAL SEARCH
==================================================

Create global search.

Search across:

Teams
Players
Matches
Competitions
Seasons

Search results should be grouped by entity.

Example:

Teams
Orlando Pirates

Players
Sipho Chaine

Matches
Orlando Pirates 2–1 Milford

Competitions
Betway Premiership

==================================================
DATA TABLE EXPERIENCE
==================================================

All major tables should support:

- Sorting
- Filtering
- Pagination
- Search
- Column alignment
- Empty states
- Loading skeletons
- Row hover
- Clickable rows
- Responsive behaviour

Use consistent table design throughout the application.

==================================================
FORMS
==================================================

Forms should have:

- Clear labels
- Appropriate input types
- Selects
- Searchable selects where appropriate
- Validation states
- Error messages
- Loading states
- Success feedback
- Sticky action bars

Do not create unnecessarily huge forms.

Group related statistics logically.

==================================================
UX DETAILS
==================================================

Include:

- Toast notifications
- Confirmation dialogs
- Loading skeletons
- Empty states
- Error states
- Breadcrumbs
- Keyboard shortcuts
- Sticky action buttons
- Collapsible sidebar
- Tooltips
- Hover states
- Focus states
- Responsive layouts

Use subtle animations only where they improve usability.

==================================================
DATA VISUALIZATION
==================================================

Use charts similar to Recharts.

Include:

- Line charts
- Bar charts
- Donut/pie charts
- Radar charts
- Area charts where appropriate

Charts should prioritize:

- Readability
- Tooltips
- Clear legends
- Good axis labels
- Consistent spacing

Do not overload screens with charts.

==================================================
API SDK INTEGRATION
==================================================

The attached SDK is the source of truth for backend capabilities.

Design the frontend around the entities and operations available in the SDK.

Where the SDK exposes:

Teams
Players
Matches
Competitions
Seasons
Team Match Stats
Player Match Stats
Dashboard analytics
Leaderboards
Search

create appropriate UI around them.

Do not invent API endpoints.

Do not modify the SDK.

The application should be structured so that the generated SDK can later be connected directly to the UI.

==================================================
IMPORTANT PROTOTYPE RULE
==================================================

This is a FRONTEND DESIGN/PROTOTYPE.

The UI should look complete and realistic.

Use realistic football data such as:

Betway Premiership
2026/2027
Orlando Pirates
Kaizer Chiefs
Mamelodi Sundowns
Stellenbosch FC
etc.

However, the visual prototype does not need a real backend connection.

Use mock data where necessary.

The attached SDK is there primarily so you can understand the actual backend structure and design the frontend around it.

==================================================
FINAL EXPERIENCE
==================================================

The finished application should feel like:

"A football analyst's personal operating system."

Not:

"A football website."

The analyst should be able to open the application, select:

Betway Premiership
2026/2027

and immediately:

- See league statistics
- Review matches
- Analyse teams
- Analyse players
- Enter match data
- Enter team statistics
- Enter player statistics
- Navigate between related entities
- Generate/review analysis

Everything should be designed around minimizing clicks and making repeated data entry fast.

Prioritize functionality, clarity, consistency and productivity over decorative design.