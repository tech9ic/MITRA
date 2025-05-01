## User Input Form

Here's a breakdown of the required user input fields:

### Location:
* **Option 1:**
    * Either take input from the user's current location.
* **Option 2:**
    * Show dropdowns for:
        * State
        * District

### Crop Type:
* Show a Category dropdown.
* Based on the selected category, show a corresponding Crop dropdown (data source: `CropTypes.js`).

### Land Size:
* Numerical input field.
* Dropdown for selecting the unit:
    * Hectare
    * Acre
    * Guntha
    * SqMeter
    * *(Add more units as needed)*

### Soil Type:
* **Option 1:**
    * Take soil type automatically from `DistrictsSoilType.js` (based on the selected district).
* **Option 2:**
    * Allow the user to input the soil type by selecting from a list of soil types.

### Date:
* Allow the user to select the planting date using a date picker.



