import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import NotifiHeader from '../../components/NotifiHeader'
import NotifiCard from '../../components/NotifiCard'

const Notification = () => {
  return (
    <>
      <NotifiHeader />
      <ScrollView 
        className="pl-[16px] pr-[16px] pt-[30px]" 
        contentContainerStyle={{ alignItems: 'center' }} 
        style={styles.container}
      >
        <NotifiCard 
          title="Live Lecture Reminder"
          message="Join our live lecture on Data Science Basics with Dr. Michael Brown at 1 PM. Don't miss the opportunity to participate and ask questions!"
          timeAgo="10 mins ago"
          markerVisible={true}
        />
        <NotifiCard 
          title="Progress Report"
          message="Here's your progress report for Python. Review your achievements and see where you can improve"
          timeAgo="5 hour ago"
          markerVisible={true}
        />
        <NotifiCard 
          title="New Quiz Available"
          message="Test your knowledge with our new quiz in Cybersecurity Fundamentals. Take the quiz now and see how well you understand the material"
          timeAgo="2 days ago"
          markerVisible={false}
        />
      </ScrollView>
    </>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom:50
  },
  font: {
    fontFamily: 'Helvetica Neue',
  },
})
