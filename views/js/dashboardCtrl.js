angular.module('dashboardCtrl', [])
  .controller('dashboardCtrl', function($scope) {
    $( ".alertMessage" ).hide( "fast", function() {
    });

    var pubnub_eon = new PubNub({
      subscribeKey: "sub-c-7c93f858-3a44-11e7-887b-02ee2ddab7fe"
    });

    var pubnub = PUBNUB.init({
      publish_key: 'pub-c-5cc5e25e-47ef-46d1-b602-5eeb96c0ee6c',
      subscribe_key: 'sub-c-7c93f858-3a44-11e7-887b-02ee2ddab7fe'
    });

    var channel = 'smart-temp';
    var eon_cols = ["Temp"];
    var eon_labels = {};
    var alert = false;
    var switchState = false;

    pubnub.subscribe({
      channel: channel,
      message: initMessage,
      connect: initLog
    });

    function initMessage(m) {
      $( ".loading" ).hide( "fast", function() {
      });

      var measureCount = m.M;
      var warnCount = m.W;
      alert = m.A;

      if(alert == true) {
        $( ".alertMessage" ).show( "slow", function() {
        });
      $('#switch').bootstrapToggle('on');
      $("#celsius").css('color', 'red');
      $("#fahrenheit").css('color', 'red');
      }
      else if (alert == false) {
        $( ".alertMessage" ).hide( "slow", function() {
        });
        $('#switch').prop('checked', false).change();
        $("#celsius").css('color', 'white');
        $("#fahrenheit").css('color', 'white');
      }

      $("#celsius").html(m.C);
      $("#fahrenheit").html(m.F);
      $("#measureCount").html(measureCount);
      $("#warningCount").html(warnCount);
    }

  //   $(function() {
  //
  //   $('#switch').change(function() {
  //     var state;
  //     switchState = $(this).prop('checked');
  //
  //     if($('.alertMessage').is(':hidden')){
  //       console.log("hidden");
  //       if(switchState == true) {
  //         state = "true";
  //       }
  //       else {
  //         state="false";
  //       }
  //       switchVentOn(state);
  //     }
  //
  //   })
  // })
    function switchVentOn(state) {
      console.log(state);
      pubnub.publish({
      channel: "smart-temp3",
      message: state
    });
    }
    $scope.sendValues = function() {
      var ventilatorSpeed = $scope.vent.speed;

      pubnub.publish({
      channel: "smart-temp2",
      message: ventilatorSpeed
    });
    }

    function initLog() {
      console.log("Initialized");
    }

    chart = eon.chart({
      pubnub: pubnub_eon,
      channels: [channel],
      history: false,
      flow: true,
      rate: 1000,
      limit: 15,
      generate: {
        bindto: "#chart",
        data: {
          colors: {"Temp":"#D70060"},
          type: "area-spline"
        },
        transition: {
          duration: 650
        },
        axis: {
          x: {
            label: "Time"
          },
          y: {
            label: "Temperature"
          }
        },
        grid: {
          x: {
            show: false
          },
          y: {
            show: false
          }
        },
        tooltip: {
         show: true
        },
        point: {
          show: true
        }
      },
      transform: function(message) {
        console.log(message);
        var o = {};
        o[eon_labels[0] || 'Room Temperature'] = message.C;

        return {
          eon: o
        };
      }
    });
  });
