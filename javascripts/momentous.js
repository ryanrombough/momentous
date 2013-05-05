// Generated by CoffeeScript 1.3.3
(function() {
  var Momentous, dropdownTemplate,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Momentous = (function() {

    function Momentous(placeholder, options) {
      this.jsDate = __bind(this.jsDate, this);

      this.moment = __bind(this.moment, this);

      this.toggle = __bind(this.toggle, this);

      this.hide = __bind(this.hide, this);

      this.show = __bind(this.show, this);

      this.setDate = __bind(this.setDate, this);

      this.directionClickHandler = __bind(this.directionClickHandler, this);

      this.dayClickHandler = __bind(this.dayClickHandler, this);

      this.updateCal = __bind(this.updateCal, this);

      this.updateNav = __bind(this.updateNav, this);

      this.update = __bind(this.update, this);

      this.init = __bind(this.init, this);
      this.placeholder = $("#" + placeholder);
      this.options = options;
      this.dateFormat = this.options.dateFormat || 'DD-MM-YYYY';
      this.events = $(this);
      this.placeholder.html(dropdownTemplate);
      this.placeholder.addClass('momentous-container');
      this.input = this.placeholder.find('.momentous-input');
      this.calButton = this.placeholder.find('.momentous-cal-button');
      this.dropdown = this.placeholder.find('.momentous-dropdown');
      this.input.bind('click', this.toggle);
      this.calButton.bind('click', this.toggle);
      this.dropdown.find('.dir-button').bind('click', this.directionClickHandler);
      this.init();
    }

    Momentous.prototype.init = function() {
      var curDay, dayName, daysHeader, dow, weekStart, _i, _ref;
      this.curDate = moment();
      this.weekStart = 1;
      if (this.options.date) {
        this.curDate = moment(this.options.date, this.dateFormat);
      }
      if ((_ref = this.options.weekStart) === 0 || _ref === 1) {
        this.weekStart = this.options.weekStart;
      }
      daysHeader = this.dropdown.find('.dow-row');
      weekStart = moment().day(this.weekStart);
      for (dow = _i = 0; _i <= 6; dow = ++_i) {
        curDay = moment(weekStart).add('days', dow);
        dayName = curDay.format('ddd').substring(0, 2);
        daysHeader.append("<th class='dow'>" + dayName + "</th>");
      }
      return this.update();
    };

    Momentous.prototype.update = function() {
      this.input.attr('value', this.curDate.format(this.dateFormat));
      this.updateNav();
      return this.updateCal();
    };

    Momentous.prototype.updateNav = function() {
      var nav;
      nav = this.dropdown.find('.days-nav');
      return nav.find('.cur-view').text(this.curDate.format('MMM YYYY'));
    };

    Momentous.prototype.updateCal = function() {
      var calHTML, daysContainer, month, monthStart, monthWeekStart,
        _this = this;
      month = this.curDate.month();
      monthStart = moment(this.curDate).date(0);
      monthWeekStart = monthStart.day(this.weekStart);
      daysContainer = this.dropdown.find('tbody');
      calHTML = "";
      [0, 1, 2, 3, 4, 5].map(function(week) {
        var daysHTML, weekHTML, weekStart;
        weekStart = moment(monthWeekStart).add('days', week * 7);
        daysHTML = "";
        [0, 1, 2, 3, 4, 5, 6].map(function(dow) {
          var classes, curDay, curDayDate;
          curDay = moment(weekStart.day(_this.weekStart + dow).format(_this.dateFormat), _this.dateFormat);
          curDayDate = curDay.format(_this.dateFormat);
          classes = 'day';
          if (curDay.month() < month) {
            classes += ' lastMonth';
          }
          if (curDay.month() > month) {
            classes += ' nextMonth';
          }
          if (curDay.format(_this.dateFormat) === _this.curDate.format(_this.dateFormat)) {
            classes += ' active';
          }
          return daysHTML += "<td class='" + classes + "' data-date='" + curDayDate + "'>" + (curDay.date()) + "</td>";
        });
        weekHTML = "<tr>" + daysHTML + "</tr>";
        return calHTML += weekHTML;
      });
      daysContainer.html(calHTML);
      return this.dropdown.find('.day').bind('click', this.dayClickHandler);
    };

    Momentous.prototype.dayClickHandler = function(event) {
      var target;
      target = $(event.currentTarget);
      this.setDate(target.data('date'));
      return this.hide();
    };

    Momentous.prototype.directionClickHandler = function(event) {
      var target;
      target = $(event.currentTarget);
      if (target.hasClass('prev')) {
        this.setDate(moment(this.curDate).subtract('months', 1));
      }
      if (target.hasClass('next')) {
        return this.setDate(moment(this.curDate).add('months', 1));
      }
    };

    Momentous.prototype.setDate = function(date) {
      this.curDate = moment(date, this.dateFormat);
      this.update();
      return this.events.trigger('dateChange');
    };

    Momentous.prototype.show = function() {
      this.visible = true;
      return this.dropdown.stop().css({
        display: 'block'
      }).animate({
        opacity: 1
      }, 200);
    };

    Momentous.prototype.hide = function() {
      this.visible = false;
      return this.dropdown.stop().css({
        display: 'none',
        opacity: 0
      });
    };

    Momentous.prototype.toggle = function() {
      if (this.visible) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    Momentous.prototype.moment = function() {
      return moment(this.curDate);
    };

    Momentous.prototype.jsDate = function() {
      return this.curDate.toDate();
    };

    return Momentous;

  })();

  window.Momentous = function(placeholder, options) {
    if (options == null) {
      options = {};
    }
    return new Momentous(placeholder, options);
  };

  dropdownTemplate = "<div class=\"input-append\">\n  <input class='momentous-input' type='text' value=''>\n  <button class=\"btn momentous-cal-button\" type=\"button\"><i class=\"icon-calendar\"></i></button>\n</div>\n<div class='momentous-dropdown popover bottom'>\n  <div class=\"arrow\"></div>\n  <div class=\"days-group\">\n    <table class=\"table-condensed\">\n      <thead>\n        <tr class=\"days-nav\">\n          <th class=\"dir-button prev\"><i class=\"icon-chevron-left\"></i></th>\n          <th colspan=\"5\" class=\"cur-view\"></th>\n          <th class=\"dir-button next\"><i class=\"icon-chevron-right\"></i></th>\n        </tr>\n        <tr class=\"dow-row\"></tr>\n      </thead>\n      <tbody></tbody>\n    </table>\n  </div>\n</div>";

}).call(this);