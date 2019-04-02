import React from 'react';

import { Card, Avatar, Row, Col } from 'antd';

import DeckList from '../containers/DeckList';

const colorList = [ '#f56a00', '#7265e6', '#ffbf00', '#00a2ae' ];

const PlayerInfo = user => (
  <div>
    <Row>
      <Col span={12}>
        <Avatar
          style={{ backgroundColor: colorList[user.id], verticalAlign: 'middle' }}
          size="large"
        >
          {user.id}
        </Avatar>
      </Col>
      <Col span={12}>
        <h1>{user.name}</h1>
      </Col>
    </Row>
  </div>
);

const Player = ( { user, pileCards } ) => {
  return (
    <div style={{ padding: '30px' }}>
      <Card title={PlayerInfo( user )} bordered={false} style={{ width: 300 }}>
        <DeckList decks={user.deck} pileCards={pileCards} />
      </Card>
    </div>
  );
};

export default Player;