// Includes functions for exporting active sheet or all sheets as JSON object (also Python object syntax compatible).
// Tweak the makePrettyJSON_ function to customize what kind of JSON to export.

// spreadsheet at https://docs.google.com/spreadsheets/d/1hFtIYUdR7wVszxANPFXQTieKZB8wO7hyRVSYwaneSoE/edit?usp=sharing

var FORMAT_ONELINE   = 'One-line';
var FORMAT_MULTILINE = 'Multi-line';
var FORMAT_PRETTY    = 'Pretty';

var LANGUAGE_JS      = 'JavaScript';
var LANGUAGE_PYTHON  = 'Python';

var STRUCTURE_LIST = 'List';
var STRUCTURE_HASH = 'Hash (keyed by "id" column)';

/* Defaults for this particular spreadsheet, change as desired */
var DEFAULT_FORMAT = FORMAT_PRETTY;
var DEFAULT_LANGUAGE = LANGUAGE_JS;
var DEFAULT_STRUCTURE = STRUCTURE_LIST;


function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [
    {name: "Export JSON for this sheet", functionName: "exportSheet"},
    {name: "Export JSON for all sheets", functionName: "exportAllSheets"}
  ];
  ss.addMenu("Export JSON", menuEntries);
}
 
function makeLabel(app, text, id) {
  var lb = app.createLabel(text);
  if (id) lb.setId(id);
  return lb;
}

function makeListBox(app, name, items) {
  var listBox = app.createListBox().setId(name).setName(name);
  listBox.setVisibleItemCount(1);
  
  var cache = CacheService.getPublicCache();
  var selectedValue = cache.get(name);
  Logger.log(selectedValue);
  for (var i = 0; i < items.length; i++) {
    listBox.addItem(items[i]);
    if (items[1] == selectedValue) {
      listBox.setSelectedIndex(i);
    }
  }
  return listBox;
}

function makeButton(app, parent, name, callback) {
  var button = app.createButton(name);
  app.add(button);
  var handler = app.createServerClickHandler(callback).addCallbackElement(parent);;
  button.addClickHandler(handler);
  return button;
}

function makeTextBox(app, name) { 
  var textArea    = app.createTextArea().setWidth('100%').setHeight('200px').setId(name).setName(name);
  return textArea;
}

function exportAllSheets(e) {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheetsData = {};
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var rowsData = getRowsData_(sheet, getExportOptions(e));
    var sheetName = sheet.getName(); 
    sheetsData[sheetName] = rowsData;
  }
  var json = makeJSON_(sheetsData, getExportOptions(e));
  displayText_(json);
}

function exportSheet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rowsData = getRowsData_(sheet, getExportOptions(e));
  var json = makeJSON_(rowsData, getExportOptions(e));
  displayText_(json);
}
  
function getExportOptions(e) {
  var options = {};
  
  options.language = e && e.parameter.language || DEFAULT_LANGUAGE;
  options.format   = e && e.parameter.format || DEFAULT_FORMAT;
  options.structure = e && e.parameter.structure || DEFAULT_STRUCTURE;
  
  var cache = CacheService.getPublicCache();
  cache.put('language', options.language);
  cache.put('format',   options.format);
  cache.put('structure',   options.structure);
  
  Logger.log(options);
  return options;
}

function makeJSON_(object, options) {
  var jsonString = JSON.stringify(object, null, 4);
  
  if (options.language == LANGUAGE_PYTHON) {
    // add unicode markers
    jsonString = jsonString.replace(/"([a-zA-Z]*)":\s+"/gi, '"$1": u"');
  }
  return jsonString;
}

function displayText_(text) {
  var output = HtmlService.createHtmlOutput("<textarea style='width:100%;' rows='20'>" + text + "</textarea>");
  output.setWidth(400)
  output.setHeight(300);
  SpreadsheetApp.getUi()
      .showModalDialog(output, 'Exported JSON');
}

// getRowsData iterates row by row in the input range and returns an array of objects.
// Arguments:
//   - sheet: the sheet object that contains the data to be processed 
// Returns an Array of objects.
function getRowsData_(sheet, options) {
  var fullRange = sheet.getDataRange();
  var numDataRows = fullRange.getValues().length - sheet.getFrozenRows();

  var headersRange = sheet.getRange(1, 1, sheet.getFrozenRows(), sheet.getMaxColumns());
  var headers = headersRange.getValues()[0];
  var subHeadersRange = sheet.getRange(2, 1, sheet.getFrozenRows(), sheet.getMaxColumns());
  var subHeaders = subHeadersRange.getValues()[0];

  var headerSubheaderDict = {};
  var currentHeaderData = null;
  for (var column = 0; column < headers.length; ++column)
  {
      if (!isCellEmpty_(headers[column]))
      {
          currentHeaderData = {};
          currentHeaderData["name"] = headers[column];
          currentHeaderData["subHeaders"] = {};
          headerSubheaderDict[column] = currentHeaderData;
      }

      if (!isCellEmpty_(subHeaders[column]))
      {
        currentHeaderData["subHeaders"][column] = subHeaders[column];
      }
  }

  var dataRange = sheet.getRange(sheet.getFrozenRows()+1, 1, numDataRows, sheet.getMaxColumns());
  var data = dataRange.getValues();
  var objects = [];
  var objectSizeData = [];

  var lastHeaderRowFound = 0;
  var objectsFound = 0;
  for (var i = 1; i < data.length; ++i) {
    var cellData = data[i][0];

    if (!isCellEmpty_(cellData)) {
      var size = i - lastHeaderRowFound;
      objectsFound = objectSizeData.push(size);
      lastHeaderRowFound = i;
    }
  }

  var size = data.length - lastHeaderRowFound;
  objectsFound = objectSizeData.push(size);

  var prevRowCount = 0;
  for (var i = 0; i < objectsFound; ++i) {
    var object = {};
    var nextObjectStart = prevRowCount + objectSizeData[i];

    for (var headerCol in headerSubheaderDict)
    {
        var headerData = headerSubheaderDict[headerCol];
        var subHeaders = headerData["subHeaders"];
        var numSubheaders = Object.keys(subHeaders).length;
        
        var cellData = data[prevRowCount][headerCol];

        if (numSubheaders == 0)
        {
            object[headerData["name"]] = cellData;
            continue;
        }

        object[headerData["name"]] = [];
        hasData = true;
        
        for (var j = prevRowCount; j < nextObjectStart; j++)
        {
          var cellData = data[j][headerCol];
          if (isCellEmpty_(cellData))
          {
            continue;
          }

          var subData = {};
          for (var subHeaderCol in subHeaders)
          {
            subData[subHeaders[subHeaderCol]] = data[j][subHeaderCol];
          }
          object[headerData["name"]].push(subData);
        }
      
    }

    objects.push(object);
    prevRowCount += objectSizeData[i];
  }

  if (options.structure == STRUCTURE_HASH) {
    var objectsById = {};
    objects.forEach(function(object) {
      objectsById[object.id] = object;
    });
    return objectsById;
  } else {
    return objects;
  }
}

// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty_(cellData) {
  return cellData == "";
}
