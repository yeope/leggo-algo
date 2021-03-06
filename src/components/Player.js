import React from 'react';

import { Card, Avatar, Row, Col, Button, Spin } from 'antd';

import DeckList from '../containers/DeckList';
import socketUtils from '../utils/socketUtil';

const colorList = [ '#f56a00', '#7265e6', '#ffbf00', '#00a2ae' ];

const Player = ( { member, pileCards, discardHolder, session } ) => {
  const myTurn = member.id === session.id;
  const disabled = session.auth.random;
  const showActionButton = member.turn && myTurn;
  const disabledHold = !session.auth.check;

  const getRandomCard = id => {
    if ( pileCards ) {
      socketUtils().emit( 'action-random', { id } );
      // return pileCards[0];
    }
  };

  const hold = id => {
    console.log( 'pass' );
    socketUtils().emit( 'action-hold', { id } );
  };

  const PlayerInfo = () => (
    <div>
      <Row>
        <Col span={6}>
          <Avatar
            style={{ backgroundColor: colorList[member.order], verticalAlign: 'middle' }}
            size="large"
          >
            {member.id}
          </Avatar>
        </Col>
        <Col span={12}>
          <h1>
            {member.name} &nbsp;
            {member.turn && (
              <Spin />
              // <Icon
              //   type="sync"
              //   spin
              // />
            )}
            <Row>
              {showActionButton ? (
                <Button
                  type="primary"
                  style={{ margin: '0px 5px 0px 0px' }}
                  disabled={disabled}
                  onClick={() => getRandomCard( member.id )}
                >
                  랜덤 카드
                </Button>
              ) : (
                ''
              )}
              {showActionButton ? (
                <Button
                  type="primary"
                  disabled={disabledHold}
                  onClick={() => hold( member.id )}
                >
                  패스
                </Button>
              ) : (
                ''
              )}
            </Row>
          </h1>
          {/* 만약 user 의 turn 이 true 면  trun 바뀔때마다 members data 받아서 다시 렌더링 */}
        </Col>
      </Row>
    </div>
  );

  return (
    <div style={{ padding: '30px' }}>
      <Card
        title={PlayerInfo()}
        bordered={false}
        style={{ width: 300, borderColor: member.turn ? 'skyblue' : '' }}
      >
        <DeckList
          member={member}
          pileCards={pileCards}
          discardHolder={discardHolder}
        />
      </Card>
    </div>
  );
};

export default Player;
