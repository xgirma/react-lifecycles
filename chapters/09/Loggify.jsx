function loggify(Wrapped) {

  let originals = {};

  const methodsToLog = ["componentWillMount"];

  methodsToLog.forEach((method) => {

    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method]
    }

    Wrapped.prototype[method] = function (...args) {
      let original = originals[method];

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);
      console.groupEnd();

      if (original) {
        original = original.bind(this);
        return original(...args)
      }
    };
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
