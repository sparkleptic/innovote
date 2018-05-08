import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

const NavItem = ({
  divider,
  children,
  exact,
  ...props
}) => {
  if (divider) return <li className='divider' />;
  return (
    <li {...props}>
    <NavLink to={props.to} exact={ exact } activeclassname='active'>{ children }</NavLink>
    </li>
  )};

NavItem.propTypes = {
    /**
     * children can be a string value or a node
     */
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    divider: PropTypes.bool,
    href: PropTypes.string
  };

export default NavItem;
