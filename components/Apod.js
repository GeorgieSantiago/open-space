import React, { useState } from 'react'
import { Image, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Video } from 'expo-av';
import { getUrlString } from '../utils/utility'

export function Apod({data}) {
    const img = "http://pluspng.com/img-png/space-png-1920.png"
    const [duration, updateDuration] = useState(null)
    const [readMore, updateReadMore] = useState(false)
    const [mediaLoaded, updateMediaLoaded] = useState(false)
    const [player, updatePlayer] = useState(null)
    return (
        <Card>
          {data ? (
            <>
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
            ? (<><Video 
                source={{uri: getUrlString(data.url)}} 
                style={mediaLoaded ? { height: 200, flex: 1 } : { height: 0 }}
                useNativeControls
                onLoad={() => mediaLoaded(true)}
                updateDuration={duration => updateDuration(duration)}
                duration={duration/* I'm using a hls stream here, react-native-video
                 can't figure out the length, so I pass it here from the vimeo config */}
                 ref={r => updatePlayer(r)}
                />
                {!mediaLoaded ? (
                <ActivityIndicator style={{justifySelf: "center", fontSize: 28 }} size="large" />
                ) : null }
                </>)
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
          </CardItem></>) : (
          <CardItem>
          <Body style={{justifyContent: 'center', flex: 1}}>
             <ActivityIndicator size="large" />
             <Text>Loading...</Text>
          </Body>
        </CardItem>             
          ) }
        </Card>
    )
}