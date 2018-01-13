function loggify(Wrapped) {

  let originals = {};

  const methodsToLog = [
    "componentWillMount",
    "componentDidMount",
    "componentWillUnmount",
    "componentWillReceiveProps",
  ];

  methodsToLog.forEach((method) => {

    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method]
    }

    Wrapped.prototype[method] = function (...args) {
      let original = originals[method];

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);

      if(method === "componentWillReceiveProps"){
        console.log("nextProps", args[0]);
      }

      console.groupEnd();

      if (original) {
        original = original.bind(this);
        return original(...args)
      }
    };

    //
    Wrapped.prototype.setState = function(partialState, callback){
      console.groupCollapsed(`${Wrapped.displayName} setState`);
      console.log('partialState ', partialState);
      console.log('callback ', callback);
      console.groupEnd();
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    }
  });

  return class extends React.Component {
    static displayName = "~Loggify~";

    render() {
      return (
        <LoggerContainer>
          <H2>
            {Wrapped.displayName} is now loggified:
          </H2>
          <Wrapped {...this.props}/>
        </LoggerContainer>
      )
    }
  }
}

const LoggerContainer = styled.default.div`
  background-color: aliceblue;
  boarder: 2px grooved aquamarine;
  border-radious: 5px;
`;

LoggerContainer.displayName = "~LoggerContainer~";

const H2 = styled.default.h2`
  color: blueviolet
`;

H2.displayName = "~H2~";
