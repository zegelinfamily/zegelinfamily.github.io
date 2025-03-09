# Travel Route Mapping

## Spreadsheet Format

### Required Columns
- Location
- LatLong
- Curvature
- Stop
- Mode
- Notes

### Example Row



### Data Guidelines
- Use Numbers spreadsheet application
- Get LatLong coordinates from Google Maps "What is here" feature
  - Copy coordinates directly for correct format
- Save final file as tab-delimited (.tsv)

### Curvature Values
- 0.3: Default value for typical routes
- 0.05: Recommended for longer continental routes
- Negative values: Curves line in opposite direction
- Requires manual tweaking

### Stop Types
- `0`: Stay (extended visit of few days)
- `1`: Visit (short stop)
- `2`: Waypoint (route guidance marker)
- `3`: Don't show (day trips from base location)

### Mode Types
- `0`: Car
- `1`: Plane 
  - Add 10 when crossing dateline (e.g., SYD ↔ SFO)
  - Note: Currently won't draw correctly across dateline
- `2`: Train
- `3`: Bus
- `4`: Ferry or Ship
- `5`: Campervan
- `6`: Other

## Workflow

### Adding a New Trip
Requires 3 files:

1. **Stops Data**
   - Format: Tab-separated (.tsv) spreadsheet
   - Location: `Resources/Trip/`
   - Naming: `[date]-[trip-name].tsv`

2. **Main Image**
   - Location: `Assets/images/`
   - Naming: Match .tsv filename

3. **Trip Markdown**
   - Location: `Content/`
   - Naming: `[date]-[trip-name].md` (NO SPACES)

### Markdown File Structure
#### YAML Header
```yaml
title: "Trip Card Name"
subtitle: "Trip Page Name"  # Optional, defaults to title
date: "YYYY-MM-DD"         # Start date, year displayed
endDate: "YYYY-MM-DD"      # End date for duration calc
days: 14                   # Optional, use if dates unknown
image: "[date]-[trip-name]" # Optional, else white rectangle
tsv: "[date]-[trip-name]"  # Required stops file
map bounds:                # Initial map coordinates
  - lat1, long1
  - lat2, long2
  - lat3, long3
  - lat4, long4
