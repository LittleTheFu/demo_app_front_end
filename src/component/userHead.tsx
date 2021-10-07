import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

interface BoundProps {
  size: number;
  center: boolean;
  padding: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    bounder: {
      padding: (props: BoundProps): number => props.padding,
      height: (props: BoundProps): number => props.size,
      width: (props: BoundProps): number => props.size,
      // border: '2px solid #000',

      display: "block",
      marginLeft: (props: BoundProps): string => (props.center ? "auto" : "0"),
      marginRight: (props: BoundProps): string => (props.center ? "auto" : "0"),
    },
    avatar: {
      borderRadius: "50%",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      height: (props: BoundProps): number => props.size * 0.8,
      width: (props: BoundProps): number => props.size * 0.8,
    },
    name: {
      textAlign: "center",
      fontSize: (props: BoundProps): number => props.size * 0.2,
    },
  })
);

interface UserHeadProps {
  userName: string;
  avatar: string;
  size?: number;
  center?: boolean;
  padding?: number;

  avatarClick?: () => void;
  nameClick?: () => void;
}

const defaultProps = {
  size: 150,
  center: true,
  padding: 0,
};

export const UserHead: React.FC<UserHeadProps> = (props: UserHeadProps) => {
  const { userName, avatar, avatarClick, nameClick, size, center, padding } = {
    ...defaultProps,
    ...props,
  };
  const classes = useStyles({ size: size, center: center, padding: padding });

  return (
    <div className={classes.bounder}>
      <img
        onClick={(): void => {
          avatarClick?.();
        }}
        src={avatar}
        alt="avatar"
        className={classes.avatar}
      />

      <div className={classes.name}>
        {nameClick ? (
          <Link
            onClick={(): void => {
              nameClick();
            }}
          >
            {userName}
          </Link>
        ) : (
          <div>{userName}</div>
        )}
      </div>
    </div>
  );
};