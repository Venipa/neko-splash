import * as React from 'react';
import { INekoImage } from '../../models/neko-image';
import './neko-display-image.scss';
import { CircularProgress, Box, Container } from '@material-ui/core';

export interface INekoDisplayImageProps {
  currentNeko: INekoImage;
  onLoad?: () => void;
  isLoading?: boolean;
}

export default class NekoDisplayImage extends React.Component<
  INekoDisplayImageProps
> {
  constructor(props: INekoDisplayImageProps) {
    super(props);
  }
  public render() {
    const neko = this.props.currentNeko;
    return (
      <Box display="flex" flex="1" flexDirection="column" alignContent="center" justifyContent="center" className="neko-display-container">
        {this.props.isLoading && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="neko-display-loading">
            <CircularProgress color="secondary" />
          </Box>
        )}
        <Container maxWidth="md" style={{position: 'relative'}}>
        <img
          src={neko.url}
          className="neko-display-image"
          onLoad={ev => this.props.onLoad && this.props.onLoad()}
        />
        </Container>
      </Box>
    );
  }
}
