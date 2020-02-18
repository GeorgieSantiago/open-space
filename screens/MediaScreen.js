import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import * as api from '../network/api'
import { Header, Item, Icon, Input, Button, Text, Container, List, ListItem, Thumbnail, Left, Body, Right, Content } from 'native-base'

export default function MediaScreen() {

  const [search, updateSearch] = useState("")
  const [page, updatePage] = useState(1)
  const [media, updateMedia] = useState([])
  const [loading, updateLoading] = useState(false)
  const [play, updatePlay] = useState(false)
  const [renderMedia, updateRenderMedia] = useState(false)

  generatePreview = links => {
    if(links.length === 1) {
      return sanitizeUrl(links[0].href)
    }

    const url = links.filter(link => {
      return link.render == "image" ? (link) : null
    })

    return sanitizeUrl(url[0].href)
  }

  const sanitizeUrl = str => {
    return str.replace(" ", "20%")
  }

  const searchMedia = () => {
      api.mediaSearch(search, page)
          .then(response => updateMedia(response.data))
          .catch(e => console.error("An error has occured in media search",{e}))
  }

  const runMedia = id => {
      
  }

  /**
   * 
        Object {
          "center": "HQ",
          "date_created": "2018-05-21T00:00:00Z",
          "description": "The remotely piloted Orbital ATK Cygnus cargo spacecraft launched May 21 from NASA's Wallops Flight Facility, Virginia atop an Antares rocket, headed for a rendezvous with the International Space Station to deliver several tons of scientific experiments and supplies for the station residents. Dubbed the SS “J.R. Thompson” in honor of the late spacefaring manager for both NASA and Orbital ATK, Cygnus will be robotically captured and installed to the earth-facing port of the station’s Unity module for a two-month stay at the orbital outpost.",
          "keywords": Array [
            "Orbital ATK",
            "Cygnus",
            "Wallops Flight Facility",
            "International Space Station",
            "launch",
          ],
          "media_type": "video",
          "nasa_id": "NHQ_2018_0521_U.S. Commercial Cargo Craft Heads to the Space Station",
          "title": "U.S. Commercial Cargo Craft Heads to the Space Station",
        },
      ],
      "href": "https://images-assets.nasa.gov/video/NHQ_2018_0521_U.S. Commercial Cargo Craft Heads to the Space Station/collection.json",
      "links": Array [
        Object {
          "href": "https://images-assets.nasa.gov/video/NHQ_2018_0521_U.S. Commercial Cargo Craft Heads to the Space Station/NHQ_2018_0521_U.S. Commercial Cargo Craft Heads to the Space Station~thumb.jpg",
          "rel": "preview",
          "render": "image",
        },
        Object {
          "href": "https://images-assets.nasa.gov/video/NHQ_2018_0521_U.S. Commercial Cargo Craft Heads to the Space Station/NHQ_2018_0521_U.S. Commercial Cargo Craft Heads to the Space Station.srt",
          "rel": "captions",
        },
      ],
    },
   */
  return (
    <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input value={search} onChangeText={str => updateSearch(str)} placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button onPress={searchMedia} transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <ScrollView style={styles.container}>
          {!loading ? (
        <Content>
          {media.length > 0 ? media.map(resource => (
          <List onPress={() => runMedia(resource.data[0].nasa_id)}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: generatePreview(resource.links)}} />
              </Left>
              <Body>
                <Text>{resource.data[0].title}</Text>
                <Text note numberOfLines={3}>{resource.data[0].description}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>-></Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          ))
          : <Text>Search videos</Text>
          }
        </Content>) : (<ActivityIndicator />) }
        </ScrollView>
    </Container>
  );
}

MediaScreen.navigationOptions = {
  title: 'Media',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
