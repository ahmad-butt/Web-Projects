"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var IssueFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  var _super = _createSuper(IssueFilter);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _super.apply(this, arguments);
  }

  _createClass(IssueFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Issue Filter Placeholder"));
    }
  }]);

  return IssueFilter;
}(React.Component);

var IssueRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(IssueRow, _React$Component2);

  var _super2 = _createSuper(IssueRow);

  function IssueRow() {
    _classCallCheck(this, IssueRow);

    return _super2.apply(this, arguments);
  }

  _createClass(IssueRow, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("tr", {
        style: this.props.rowStyle
      }, /*#__PURE__*/React.createElement("td", {
        style: this.props.rowStyle
      }, this.props.issue.id), /*#__PURE__*/React.createElement("td", {
        style: this.props.rowStyle
      }, this.props.issue.status), /*#__PURE__*/React.createElement("td", {
        style: this.props.rowStyle
      }, this.props.issue.owner), /*#__PURE__*/React.createElement("td", {
        style: this.props.rowStyle
      }, this.props.issue.created ? this.props.issue.created : 'No Date Assigned'), /*#__PURE__*/React.createElement("td", {
        style: this.props.rowStyle
      }, this.props.issue.effort), /*#__PURE__*/React.createElement("td", {
        style: this.props.rowStyle
      }, this.props.issue.due ? this.props.issue.due : 'No Date Assigned'), /*#__PURE__*/React.createElement("td", {
        style: this.props.rowStyle
      }, this.props.issue.title));
    }
  }]);

  return IssueRow;
}(React.Component);

var IssueTable = /*#__PURE__*/function (_React$Component3) {
  _inherits(IssueTable, _React$Component3);

  var _super3 = _createSuper(IssueTable);

  function IssueTable() {
    _classCallCheck(this, IssueTable);

    return _super3.apply(this, arguments);
  }

  _createClass(IssueTable, [{
    key: "render",
    value: function render() {
      var rowStyle = {
        border: '1px solid silver',
        padding: 4
      };
      return /*#__PURE__*/React.createElement("table", {
        style: {
          borderCollapse: 'collapse'
        }
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
        style: rowStyle
      }, "ID"), /*#__PURE__*/React.createElement("th", {
        style: rowStyle
      }, "Status"), /*#__PURE__*/React.createElement("th", {
        style: rowStyle
      }, "Owner"), /*#__PURE__*/React.createElement("th", {
        style: rowStyle
      }, "Created"), /*#__PURE__*/React.createElement("th", {
        style: rowStyle
      }, "Effort"), /*#__PURE__*/React.createElement("th", {
        style: rowStyle
      }, "Due Date"), /*#__PURE__*/React.createElement("th", {
        style: rowStyle
      }, "Title"))), /*#__PURE__*/React.createElement("tbody", null, this.props.issues.map(function (issue) {
        return /*#__PURE__*/React.createElement(IssueRow, {
          issue: issue,
          rowStyle: rowStyle
        });
      })));
    }
  }]);

  return IssueTable;
}(React.Component);

var IssueAdd = /*#__PURE__*/function (_React$Component4) {
  _inherits(IssueAdd, _React$Component4);

  var _super4 = _createSuper(IssueAdd);

  function IssueAdd() {
    var _this;

    _classCallCheck(this, IssueAdd);

    _this = _super4.call(this);
    _this.state = {
      owner: '',
      title: ''
    };
    _this.handleOwner = _this.handleOwner.bind(_assertThisInitialized(_this));
    _this.handleTitle = _this.handleTitle.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueAdd, [{
    key: "handleOwner",
    value: function handleOwner(e) {
      e.preventDefault();
      this.setState({
        owner: e.target.value
      });
    }
  }, {
    key: "handleTitle",
    value: function handleTitle(e) {
      e.preventDefault();
      this.setState({
        title: e.target.value
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var issue = {
        owner: this.state.owner,
        title: this.state.title,
        due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString()
      };
      this.props.createIssue(issue);
      this.setState({
        owner: '',
        title: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
        name: "issueAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        value: this.state.owner,
        onChange: this.handleOwner,
        type: "text",
        name: "owner",
        placeholder: "Owner"
      }), /*#__PURE__*/React.createElement("input", {
        value: this.state.title,
        onChange: this.handleTitle,
        type: "text",
        name: "title",
        placeholder: "Title"
      }), /*#__PURE__*/React.createElement("button", null, "Add")));
    }
  }]);

  return IssueAdd;
}(React.Component);

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var variables,
        response,
        result,
        error,
        details,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            variables = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            _context3.prev = 1;
            _context3.next = 4;
            return fetch('http://localhost:3000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context3.sent;
            _context3.next = 7;
            return response.json();

          case 7:
            result = _context3.sent;

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code === 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n');
                alert("".concat(error.message, ":\n").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context3.abrupt("return", result);

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            alert("Error in sending Data to server ".concat(_context3.t0.message));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var IssueList = /*#__PURE__*/function (_React$Component5) {
  _inherits(IssueList, _React$Component5);

  var _super5 = _createSuper(IssueList);

  function IssueList() {
    var _this2;

    _classCallCheck(this, IssueList);

    _this2 = _super5.call(this);

    _defineProperty(_assertThisInitialized(_this2), "loadData", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var query, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = "\n            query{\n                issueList {\n                    id\n                    title\n                    status\n                    owner\n                    effort\n                    created\n                    due\n                }\n            }\n        ";
              _context.next = 3;
              return graphQLFetch(query);

            case 3:
              result = _context.sent;

              if (result) {
                _this2.setState({
                  issues: result.data.issueList
                });
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _this2.state = {
      issues: []
    };
    _this2.createIssue = _this2.createIssue.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "createIssue",
    value: function () {
      var _createIssue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(newIssue) {
        var query, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation temp ($newIssue: IssueInputs!) {\n            setIssueAdd(issue: $newIssue) {\n              id\n            }\n        }"; // const response = await fetch('/graphql',{
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify({query, variables: {newIssue}})
                // });

                _context2.next = 3;
                return graphQLFetch(query, {
                  newIssue: newIssue
                });

              case 3:
                response = _context2.sent;

                if (response) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createIssue(_x2) {
        return _createIssue.apply(this, arguments);
      }

      return createIssue;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
        issues: this.state.issues
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
        createIssue: this.createIssue
      }));
    }
  }]);

  return IssueList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));