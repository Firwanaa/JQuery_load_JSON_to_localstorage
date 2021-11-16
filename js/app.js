/**
 * @author Alqassam Firwana
 * @id _________
 * Assignment 2
 */



var obj = {};
var rdate;
var preDDA;
var tDDA;
var tDIFVI;
var tIFV;
var datesList = new Array();
var sortedList = new Array();
var len = localStorage.length;
var displayTitle =
  "Summary of Total Vaccine Doses" + "<br>" + "Administered in Ontario";
class Reports {//Report Class and constructor 
  constructor(
    date,
    preD,
    totalDaily,
    totalFully,
    totalIndividual,
    myId = { id: "firwanaa" }
  ) {
    this.date = date;
    this.preD = preD;
    this.totalDaily = totalDaily;
    this.totalFully = totalFully;
    this.totalIndividual = totalIndividual;
    this.myId = myId;
  }
}
$(document).ready(() => {
  $("#header").load("/header/header.html"); //load header
  $("#footer").load("/footer/footer.html"); //load footer

  $.ajax({
    type: "GET",
    url: "dataFiles/vaccine_doses.json",
    dataType: "json",
    success: loadFile,
    error: errorFunc,
  });

  $("#displayBtn").click(() => {
    if (datesList.length > 0) return;
    for (let i = 0; i < localStorage.length; i++) {
      var pre = localStorage.key(i);
      var post = new Date(JSON.parse(pre));
      var res = post.toISOString().slice(0, 10).replace(/-/g, "/");
      datesList.push(res);
    }

    //Sort and display dates
    function dateToNum(d) {
      // Convert date
      d = d.split("/");
      return Number(d[0] + d[1] + d[2]);
    }
    datesList.sort(function (a, b) {
      return dateToNum(a) - dateToNum(b);
    });
    for (var i = 0; i < datesList.length; i++) {
      var li = "<li>" + "Report Date :" + datesList[i] + "</li>";
      +"<hr>";
      $("#list").append(li);
    }
  });

  $(".ul").on("click", "li", function () {
    // Event handler code here.
    var val = $(this).text();
    var editVal = val.replace(/\//g, "-");
    editVal = editVal.substr(13, 23);
    for (var i = 0; i < localStorage.length; i++) {
      var unParsedObj = localStorage.getItem(localStorage.key(i));
      var parsedObj = JSON.parse(unParsedObj);
      if (editVal === parsedObj.report_date) {//validate and parse
        $("#list2").html(
          "<p>" +
            displayTitle +
            "</p>" +
            "<li>" +
            "Report Date :" +
            parsedObj.report_date +
            "</li>" +
            "<li>" +
            "Previous day doses administered: " +
            parsedObj.previous_day_doses_administered +
            "</li>" +
            "<li>" +
            "Total doses administered: " +
            parsedObj.total_doses_administered +
            "</li>" +
            "<li>" +
            "Total doses in fully vaccinated individuals: " +
            parsedObj.total_doses_in_fully_vaccinated_individuals +
            "</li>" +
            "<li>" +
            "total_individuals_fully_vaccinated: " +
            parsedObj.total_individuals_fully_vaccinated +
            "</li>" +
            "<li>" +
            "ID: " +
            parsedObj.id +
            "</li>"
        );
        break;
      }
    }
  });
});

function loadFile() {
  $.getJSON("dataFiles/vaccine_doses.json", function (data) {
    // loading JSON file to localStorage
    console.log(len);
    $("#loadBtn")
      .bind("click")
      .click(() => {
        $.each(data, function (index) {
          data[index].id = "firwanaa";
          rdate = JSON.stringify(data[index].report_date);
          var obj = JSON.stringify(data[index]);
          localStorage.setItem(rdate, obj);
          $(".hide").html("File loaded successfully");
        });
      });
  });
}

function errorFunc(e) {
  console.log(e);
}

function checkLocalStorage() {
  if (loaded) {
    console.log("file loaded");
    console.log(localStorage.length);
    return;
  }
}
