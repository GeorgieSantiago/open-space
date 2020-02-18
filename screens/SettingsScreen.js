import React from 'react';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

export default function SettingsScreen() {

  return(
    <Container>
    <Content>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="airplane" />
          </Button>
        </Left>
        <Body>
          <Text>Launch Notifications</Text>
        </Body>
        <Right>
          <Switch value={false} />
        </Right>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon active name="wifi" />
          </Button>
        </Left>
        <Body>
          <Text>Music</Text>
        </Body>
        <Right>
          <Text>GeekyAnts</Text>
          <Icon active name="arrow-forward" />
        </Right>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon active name="bluetooth" />
          </Button>
        </Left>
        <Body>
          <Text>Other</Text>
        </Body>
        <Right>
          <Text>On</Text>
          <Icon active name="arrow-forward" />
        </Right>
      </ListItem>
    </Content>
  </Container>
    )

}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
