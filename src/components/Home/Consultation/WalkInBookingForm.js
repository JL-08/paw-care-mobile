import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Button,
  Text,
  List,
  Datepicker,
  Icon,
  IndexPath,
  Select,
  SelectItem,
  Input,
  Modal,
  Card,
} from '@ui-kitten/components';
import {default as TimePicker} from 'react-native-date-picker';
import moment from 'moment';

import {getAllUserPets} from '../../../actions/petActons';

const WalkInBookingForm = ({
  setIsInMap,
  vetData,
  setVetData,
  navigation,
  setIsLoading,
}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.authData);
  const pets = useSelector(state => state.pet.petData);

  const CalendarIcon = props => <Icon {...props} name="calendar" />;

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllUserPets(user.user_id, setIsLoading));
  }, []);

  return (
    <View>
      <View style={{marginRight: 15, marginVertical: 10, flexDirection: 'row'}}>
        <Image
          style={styles.avatar2}
          source={require('../../../images/avatar.gif')}
        />
        <View style={styles.margin}>
          <Text style={styles.name} category="h6">
            Dr. {vetData.name}
          </Text>
          <Text category="s2">Doctor of Veterinary Medicine</Text>
        </View>
      </View>
      <Datepicker
        style={styles.margin}
        label="Date"
        placeholder="Pick Date"
        date={date}
        onSelect={nextDate => setDate(nextDate)}
        accessoryRight={CalendarIcon}
      />
      <Text style={{...styles.labelColor, fontSize: 12}}>Time</Text>
      <TouchableOpacity
        style={styles.timeTouch}
        onPress={() => setIsEditingTime(true)}>
        {/* <Input
          style={styles.margin}
          label="Time"
          placeholder="00:00"
          //</View>onFocus={() => setIsEditingTime(true)}
        /> */}
        <Text style={styles.labelColor}>{moment(time).format('LT')}</Text>
      </TouchableOpacity>
      <Select
        style={styles.margin}
        label="Select Pet"
        onSelect={index => setSelectedIndex(index.row)}
        value={pets ? pets[selectedIndex].name : '--'}>
        {pets && pets.map(pet => <SelectItem title={pet.name} key={pet.id} />)}
      </Select>
      <Input
        style={styles.margin}
        label="Reason of Consultation"
        multiline={true}
        textStyle={{minHeight: 64}}
        placeholder="your message here..."
      />
      <View style={styles.row}>
        <Button
          style={{flex: 1}}
          onPress={() => navigation.push('Booking Details', {type: 'Walk-In'})}>
          CONTINUE
        </Button>
        <Button
          onPress={() => {
            setIsInMap(true);
            setVetData();
          }}
          appearance="ghost">
          CANCEL
        </Button>
      </View>

      <Modal visible={isEditingTime}>
        <Card disabled={true}>
          <View>
            <TimePicker
              date={time}
              mode="time"
              onDateChange={e => setTime(e)}
            />
          </View>
          <Button onPress={() => setIsEditingTime(false)} appearance="ghost">
            OK
          </Button>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  margin: {
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  timeTouch: {
    backgroundColor: '#F7F9FC',
    padding: 10,
    marginBottom: 10,
  },
  labelColor: {
    color: '#777',
  },
});

export default WalkInBookingForm;
