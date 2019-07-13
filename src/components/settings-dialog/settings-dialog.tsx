import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  ListItemIcon
} from '@material-ui/core';
import { NekoSettings } from '../../models/neko-settings';
import { settings, settings$ } from '../../App';

export interface SettingsDialogProps {
  open: boolean;
  onClose: (value: NekoSettings) => void;
}

export default class SettingsDialog extends Component<
  SettingsDialogProps,
  NekoSettings
> {
  constructor(props: SettingsDialogProps) {
    super(props);
    this.state = settings.getValue();
  }

  handleClose(props: SettingsDialogProps) {
    if (props && props.onClose) {
        props.onClose(this.state);
    }
  }

  componentDidMount() {
    settings$.subscribe(x => this.setState(x));
  }
  saveSettings(st: Partial<NekoSettings>) {
    const s = Object.assign(this.state, st);
    settings.next(s);
  }
  render() {
    const { onClose, ...other } = this.props;
    return (
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        onClose={() => {
            if (onClose) {
                onClose(this.state);
            }
        }}
        aria-labelledby="dialog-title"
        {...other}
      >
        <DialogTitle id="dialog-title">Settings</DialogTitle>
        <List>
          <ListItem
            button
            onClick={() =>
              this.saveSettings({
                darkMode: !this.state.darkMode
              })
            }
          >
            <ListItemText id="dm-toggle" primary="Dark Mode" />
            <ListItemIcon>
              <Switch
                edge="end"
                checked={this.state && this.state.darkMode}
                inputProps={{ 'aria-labelledby': 'dm-toggle' }}
              />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            onClick={() =>
              this.saveSettings({
                nsfwEnabled: !this.state.nsfwEnabled
              })
            }
          >
            <ListItemText id="nsfw-toggle" primary="Enable NSFW" />
            <ListItemIcon>
              <Switch
                edge="end"
                checked={this.state && this.state.nsfwEnabled}
                inputProps={{ 'aria-labelledby': 'nsfw-toggle' }}
              />
            </ListItemIcon>
          </ListItem>
        </List>
      </Dialog>
    );
  }
}
