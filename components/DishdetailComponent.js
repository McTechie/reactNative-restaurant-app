import React, { Component, useRef } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;

    const viewRef = useRef(null);

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    };

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {viewRef.current.rubberBand(1000);},
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeComment(gestureState))
              return props.toggle();

            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    });

    if (dish != null) {
        return(
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={viewRef} {...panResponder.panHandlers}>
            <Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image}}>
              <Text style={{margin: 10}}>
                {dish.description}
              </Text>
              <View style={styles.buttonContainer}>
                <View>
                  <Icon raised reverse name={ props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50' onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
                </View>
                <View>
                  <Icon raised reverse name={'pencil'} type='font-awesome' color='#512DA8' onPress={() => props.toggle()} />
                </View>
              </View>
            </Card>
          </Animatable.View>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating imageSize={10} readonly startingValue={item.rating} style={styles.rating} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + Date(item.date)} </Text>
            </View>
        );
    };

    return (
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title='Comments' >
          <FlatList  data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
        </Card>
      </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            dishId: '',
            rating: 5,
            author: '',
            comment: ''
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.resetForm();
    }

    resetForm() {
        this.setState({
            showModal: false,
            dishId: '',
            rating: 5,
            author: '',
            comment: ''
        });
    }

    render() {
        const dishId =  this.props.navigation.getParam('dishId','');
        return(
          <ScrollView>

            <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el === dishId)} onPress={() => this.markFavorite(dishId)} toggle={() => this.toggleModal()} />

            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

            <Modal animationType = {"slide"} transparent = {false} visible = {this.state.showModal} onDismiss = {() => this.toggleModal() } onRequestClose = {() => this.toggleModal() }>

              <View style = {styles.modal}>

                <Rating
                    showRating
                    name={'rating'}
                    fractions="{1}"
                    minValue="1"
                    startingValue="5"
                    defaultRating="5"
                    onFinishRating={(rate) => {this.setState({rating: rate})}} />

                <View style={styles.formRow}></View>

                <Input
                    title="Author"
                    placeholder=" Author"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(input) => {this.setState({author: input})}} />

                <Input
                    title="Comment"
                    placeholder=" Comment"
                    leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                    onChangeText={(input) => {this.setState({comment: input})}} />

                <View style={styles.formRow}>
                  <Button
                    title="Submit"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => this.handleComment(dishId)} />
                </View>

                <View style={styles.formRow}>
                  <Button
                    title="Cancel"
                    color="gray"
                    accessibilityLabel="Learn more about this grey button"
                    onPress={() => this.resetForm()} />
                </View>

              </View>

            </Modal>

          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
       justifyContent: 'center',
       margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rating: {
        alignSelf: 'flex-start',
        marginTop: 6,
        marginBottom: 6
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
