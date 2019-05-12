import React from 'react';
import { connect } from 'react-redux';

import { Button, message } from 'antd';

import socketUtil from '../utils/socketUtil';

class ControllPanel extends React.Component {
  start = () => {
    const { auth } = this.props.sessionReducer;

    // start => 카드분배 => 턴 순회 1분 => 점수
    socketUtil().emit( 'start', auth.host );
  };

  join = () => {
    const { id, name, enter } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;

    if ( enter ) {
      message.warn( '이미 참가함' );
      return;
    }

    if ( deal ) {
      message.warn( '게임 중에는 참가 못함' );
      return;
    }

    socketUtil().emit( 'join', { id, name } );
  };

  exit = () => {
    const { id, enter } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;

    if ( !enter ) {
      message.warn( '참가부터해라' );
      return;
    }

    if ( deal ) {
      message.warn( '게임중에는 못나간다' );
      return;
    }

    socketUtil().emit( 'exit', id );
  };

  render() {
    const { auth } = this.props.sessionReducer;
    const { deal } = this.props.gameReducer;
    const { start, join, exit } = this;

    const showButton = auth.host && !deal;

    return (
      <div>
        {showButton ? (
          <Button
            type="primary"
            size="large"
            onClick={start}
            style={{ marginRight: '8px' }}
          >
            시작
          </Button>
        ) : (
          ''
        )}
        <Button
          type="primary"
          size="large"
          onClick={join}
          style={{ marginRight: '8px' }}
        >
          참가
        </Button>
        <Button
          type=""
          onClick={exit}
          size="large"
          style={{ marginRight: '8px' }}
        >
          나가기
        </Button>
      </div>
    );
  }
}

export default connect( state => state )( ControllPanel );