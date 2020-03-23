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
          The goal of the game is to keep the global infection rate <b>below 70%</b>. You can win by containing the virus so that there are no new infections.
        </p>
        <p>
          Click on a continent to see the individual statistics. 
          To reduce the speed by which the virus spreads, you can perform actions which affect the infection rate and the happiness of the population.
        </p>
        <p>
          <b>But beware:</b> A low level of happiness will increase the cost of new actions. So use them carefully and find a balance to contain the virus without neglecting the people.
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