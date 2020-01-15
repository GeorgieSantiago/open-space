import React from 'react'
import { ActivityIndicator } from 'react-native'
export function Loading({display}) {
    return display ? <ActivityIndicator size="large" color="#0000ff" /> : null
}