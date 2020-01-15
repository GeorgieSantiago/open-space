import React, { useState } from 'react'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import VideoPlayer from 'react-native-video-player';
import { getUrlString } from '../utils/utility'

export function Apod({data}) {
    const img = "http://pluspng.com/img-png/space-png-1920.png"
    const [duration, updateDuration] = useState(null)
    const [readMore, updateReadMore] = useState(false)
    const [player, updatePlayer] = useState(null)
    return (
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>{data.title}</Text>
                <Text note>{data.copyright}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            {data.media_type === "video" 
            ? (<VideoPlayer 
                video={{uri: getUrlString(data.url)}} 
                style={{height: 200, flex: 1}}
                updateDuration={duration => updateDuration(duration)}
                duration={duration/* I'm using a hls stream here, react-native-video
                 can't figure out the length, so I pass it here from the vimeo config */}
                 ref={r => updatePlayer(r)}
                />)
            : (<Image source={{uri: data.url}} style={{height: 200, flex: 1}}/>)}
          </CardItem>
          <CardItem>
            <Body>
                <Button full bordered onPress={() => updateReadMore(!readMore)}>
                  <Text>Read More</Text>
                </Button>
                {readMore ? (
                <Text>{data.explanation}</Text>
                ) : null }
            </Body>
          </CardItem>
        </Card>
    )
}