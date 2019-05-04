/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import PlayerList from './PlayerList';
import Stack from './Stack';
import MainStructure from '../components/structure/MainStructure';
import StatusInterface from '../components/StatusInterface';
import ControllPanel from '../components/ControllPanel';

import socketUtil, { initSocket } from '../utils/socketUtil';
import { saveSession, initSession } from '../store/session/actions';
import { updateStatus, getCurrentUser } from '../store/game/actions';

// test
import { Button } from 'antd';

const maxUserCount = 4;
class PlayGround extends Component {
  componentDidMount() {
    initSocket( 'http://localhost:3001' );

    socketUtil().emit( 'member-list' );
    socketUtil().on( 'member-list', data => {
      this.props.updateGameStatus( { members: data } );
    } );

    socketUtil().on( 'start', data => {
      this.props.updateGameStatus( data );
      this.saveCurrentSession();
    } );

    socketUtil().on( 'init', data => {
      this.props.updateGameStatus( { ...data } );
      this.props.initSession();
    } );
  }

  componentWillUnmount() {
    socketUtil().emit( 'disconnect-user' );
  }

  getGameReducer = () => {
    return this.props.gameReducer;
  };

  getSessionReducer = () => {
    return this.props.sessionReducer;
  };

  saveCurrentSession = () => {
    const { members } = this.getGameReducer();
    const { id } = this.getSessionReducer();

    const currentUser = getCurrentUser( { members, id } );

    this.props.saveSession( currentUser );
  };

  isCrowded = () => {
    const { members } = this.getGameReducer();
    const userCount = members.length;
    return userCount >= maxUserCount;
  };

  start = () => {
    const { auth } = this.getSessionReducer();

    // start => 카드분배 => 턴 순회 1분 => 점수
    socketUtil().emit( 'start', auth.host );
  };

  join = () => {
    const { id, name, auth } = this.getSessionReducer();

    socketUtil().emit( 'join', id, name );
    socketUtil().on( 'member-list', data => {
      this.props.updateGameStatus( { members: data } );
      this.saveCurrentSession();
    } );

    if ( !auth.host ) {
      // this.start();
    }
  };

  init = () => {
    socketUtil().emit( 'init' );
  };

  render() {
    const sessionReducer = this.getSessionReducer();
    const gameReducer = this.getGameReducer();

    const { deal, pileCards, members, auth } = gameReducer;
    const { init, start, join } = this;

    const host = auth && auth.host;

    return (
      <MainStructure>
        <div style={{ width: '90%', maxWidth: '1400px', margin: '0 auto' }}>
          <StatusInterface session={sessionReducer} pileCards={pileCards} members={members} />

          <br />

          <Button type="danger">test</Button>
          <Button type="danger" onClick={init}>
            init
          </Button>

          <ControllPanel deal={deal} start={start} join={join} host={host} />

          <br />

          <PlayerList members={members} pileCards={pileCards} />

          <br />

          <Stack pileCards={pileCards} />
        </div>
      </MainStructure>
    );
  }
}

const mapDispatchToProps = dispatch => ( {
  saveSession: data => dispatch( saveSession( data ) ),
  initSession: () => dispatch( initSession() ),
  updateGameStatus: data => dispatch( updateStatus( data ) ),
  getCurrentUser: data => dispatch( getCurrentUser( data ) ),
} );

export default connect(
  state => state,
  mapDispatchToProps,
)( PlayGround );
