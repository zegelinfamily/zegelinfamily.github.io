# Travel Route Mapping

A website to display our travels using the Ignite website builder. By placing a few files in the proper locations of this package and rebuilding the website a new trip can be added to the website. This will show a new trip on the front page, with the latest trip at the top. Clicking on the trip image will go to a trip page showing a map with with a sidebar list of all the locations visited.

After adding a new trip the website is rebuilt via the Run command 'cmd R'

## Adding a New Trip
Requires 2 files, with an optional image file to display on the front page. The location specifies where the file should be placed within this package. See an example trip for a better understanding.

1. **Stops Data**
   - Format: Tab-separated (.tsv) spreadsheet
   - Location: `Resources/Trip/`
   - Naming: `[YYYY] [trip-name].tsv`

2. **Trip Markdown**
   - Location: `Content/`
   - Naming: `[YYYY]_[trip_name].md` (NO SPACES! - Use '_')
   
3. **Image**
   - Location: `Assets/images/`
   - Naming: Match .tsv filename


### Trip Markdown File Structure
#### YAML Header
```yaml
title: "Trip Card Name"
subtitle: "Trip Page Name"  # Optional, defaults to title
date: "YYYY-MM-DD"          # Start date, only year is displayed
endDate: "YYYY-MM-DD"       # Optional, end date for duration calculations
days: 14                    # Optional, use if dates unknown
image: "[YYYY] [trip name]" # Optional, else you will get a white rectangle. Size 350W x 233H
tsv: "[YYYY]_[trip_name]"   # Required stops file
mapbounds: [lat1, long1], [lat2, long2]  # Initial map bounding box
```
#### Blurb
A blurb can be added after the YAML header. This will be displayed above the map on the individual trip page.


## Stops Data

#### Spreadsheet Format - Required Columns. Do not add more columns and do not rename.
- Location
- LatLong
- Curvature
- Stop
- Mode
- Notes

Example Row:

 “Canberra, ACT”    -35.355434, 149.066050    0.3    0     1     “Capital of Australia”

#### Data Guidelines
- Use Numbers spreadsheet application or a spreadsheet app that will export tab-delimited.
- Get LatLong coordinates of individual stops from Google Maps "What is here" feature
  - Copy coordinates directly for correct format
- Save final file as tab-delimited (.tsv)
- File name must match the name displayed in the tsv: row to the YAML header

#### Curvature Values - this will show a curved line between stops
- 0.3: Default value for typical routes
- 0.05: Recommended for longer continental routes
- Negative values: Curves line in opposite direction
- Requires manual tweaking

#### Stop Types
- `0`: Stay (extended visit of a few days)
- `1`: Visit (short stop)
- `2`: Waypoint (route guidance marker)
- `3`: Don't show (day trips from base location)

#### Mode Types
- `0`: Car
- `1`: Plane 
  - Add 10 when crossing dateline (e.g., SYD ↔ SFO)
  - Note: Currently won't draw correctly across dateline
- `2`: Train
- `3`: Bus
- `4`: Ferry or Ship
- `5`: Campervan
- `6`: Other
