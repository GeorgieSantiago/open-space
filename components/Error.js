import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Toast, Button, Text, Root } from 'native-base';
import { useSelector } from 'react-redux'
export function ErrorToast() {
    const {hasError, error} = useSelector(store => store.appReducer)
    
    const dismiss = () => {
        //Dispatch a clear
    }

    return hasError ?  (
      <Root style={{height: 20}}>
        <Header />
        <Content padder>
            <Text>An Error Occured!</Text>
            <Text>{error}</Text>
        </Content>
      </Root>
    ) : null

}