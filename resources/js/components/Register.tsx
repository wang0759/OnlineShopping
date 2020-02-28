import { Component, HtmlHTMLAttributes } from "react";
import React from "react";
import { TextField, Container, Grid, createStyles, makeStyles, Theme, withStyles, InputAdornment, Button, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, Paper } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import FormErrorMessage from './FormErrorMessage';
import axios from "axios";

interface RegState{
    userName?: string;
    userPasswd1?: string;
    userPasswd2?: string;
    userEmail?: string;
    errorMessage?: string;
    regdia?: any;
    dialogMessage?: string;
}

const styles = (theme:Theme) => ({
    margin:{
        margin: theme.spacing(1),
        width: "100%",
    },
    paper:{
        padding: theme.spacing(3, 2),
        marginTop: "10%",
    },
});

class Register extends Component<any, RegState>{
    constructor(props:any){
        super(props);
        this.state = {
            userName:"",
            userPasswd1:"",
            userPasswd2:"",
            userEmail:"",
            errorMessage:undefined,
            regdia:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const itemName = e.target.name;
        const itemValue = e.target.value;
        this.setState({[itemName]: itemValue}, ()=>{
            if(this.state.userPasswd1!==this.state.userPasswd2){
                this.setState({errorMessage: "Passwords do not match"});
            }else{
                this.setState({errorMessage: undefined});
            }
        });
    }

    handleClose(e: any){
        this.setState({regdia:false});
        //console.log("closed!");
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(this.state.userPasswd1==this.state.userPasswd2){
            const {userEmail, userName, userPasswd1} = this.state;
            axios.post("api/register_request", {
                    user_email: this.state.userEmail,
                    user_name: this.state.userName,
                    user_password: this.state.userPasswd1,
            }, {withCredentials: true}).then(response => {
                this.setState({regdia:true});
                this.setState({dialogMessage:"You have successfully registered!"})
            }).catch(error => {
                this.setState({regdia:true});
                this.setState({dialogMessage:"Oops, an error occurred!"})
            });
        }else{
            //console.log("Error");
        }

    }
    render(){
        const {classes} = this.props;
        return(
            <Container maxWidth="md">
            <Dialog
                open={this.state.regdia}
                onClose={this.handleClose}
                aria-labelledby="dtitle"
                >
                <DialogTitle id="dtitle">{"Registration"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {this.state.dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose} color="primary">
                        Got it
                    </Button>
                </DialogActions>
                </Dialog>
                <Grid container style={{marginTop: 20, alignItems:"center", display:"flex"}}>
                <Paper className={classes.paper}>
                <form onSubmit={this.handleSubmit}>
                        <TextField
                            className={classes.margin}
                            id="userNameText"
                            name="userName"
                            label="User Name"
                            placeholder="User Name"
                            onChange={this.handleChange}
                            value={this.state.userName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle></AccountCircle>
                                    </InputAdornment>
                                ),
                            }}
                            required></TextField>
                        <TextField
                            className={classes.margin}
                            id="userEmail"
                            placeholder="Email"
                            name="userEmail"
                            label="Email"
                            onChange={this.handleChange}
                            value={this.state.userEmail}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <EmailRoundedIcon></EmailRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            required></TextField>
                        <TextField
                            className={classes.margin}
                            id="userPasswd1"
                            name="userPasswd1"
                            placeholder="Password"
                            label="Password"
                            value={this.state.userPasswd1}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                    <LockRoundedIcon></LockRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            required></TextField>
                            <TextField
                            className={classes.margin}
                            id="userPasswd2"
                            name="userPasswd2"
                            placeholder="Password Verification"
                            label="Password Verification"
                            value={this.state.userPasswd2}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <LockRoundedIcon></LockRoundedIcon>
                                    </InputAdornment>
                                )
                            }}
                            required></TextField>
                        {this.state.errorMessage !== undefined ?(
                            <FormErrorMessage theMessage={this.state.errorMessage}></FormErrorMessage>
                        ):null}
                        <Button className={classes.margin} type="submit" variant="contained" color="primary">Register</Button>
                    </form>
                    </Paper>
                </Grid>
            </Container>
        );
    }
}
export default withStyles(styles)(Register);
