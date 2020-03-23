import React, { FunctionComponent } from 'react';

type Buttonrops = {
}

const HelpModal: FunctionComponent<Buttonrops> = () => {

  return (
    <div id="open-modal" className="modal-window">
      <div>
        <a href="#" title="Close" className="modal-close">Close</a>
        <h1>HowTo Play</h1>
        <p>
          The goal of the game is to keep the global infection rate <b>below 70%</b>.
        </p>
        <p>
          Click on a continent to see the individual statistics. 
          To keep the number of infected people low and the happiness high, you can perform actions.
        </p>
        <p>
          Caution: The level of happiness has also an influence on the costs (Toilet paper).
        </p>
        <hr/>
        <p>Hint:<br/>
          The red arrows indicate how urgent an action is needed.
        </p>
      </div>
    </div>
  )
}

export default HelpModal;