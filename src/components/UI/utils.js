import React from 'react';
import { has } from 'lodash';
import { Tooltip } from 'antd';

export function findClass(element, className) {
  let foundElement = null;
  function recurse(element, className, found) {
    for (var i = 0; i < element.childNodes.length && !found; i++) {
      var el = element.childNodes[i];
      var classes = el.className !== undefined? el.className.split(" ") : [];
      for (var j = 0, jl = classes.length; j < jl; j++) {
        if (classes[j] === className) {
          found = true;
          foundElement = element.childNodes[i];
          break;
        }
      }
      if(found)
          break;
      recurse(element.childNodes[i], className, found);
    }
  }
  recurse(element, className, false);
  return foundElement;
}

// pozor na přepis této fce, může dojít k rozhození stylů
export function renderTooltip(input, useStandardErrorMsg, errorMsg, {active, validationTooltipEnabled, warning, tooltipClassName, placement} = {}) {
  if (!useStandardErrorMsg) {
    if (warning) {
      return (
        <Tooltip
          placement={placement ? placement : "bottomRight"}
          title={errorMsg}
          visible={validationTooltipEnabled === false ? false : active}
          overlayClassName={tooltipClassName}
        >
          <div className="validation">
            {input}
          </div>
        </Tooltip>
      )
    }

    return (
      <Tooltip
        placement={placement ? placement : "bottomRight"}
        title={errorMsg}
        visible={validationTooltipEnabled === false ? false : (active || !!errorMsg)}
        overlayClassName={tooltipClassName}
      >
        <div className="validation">
            {input}
        </div>
      </Tooltip>
    )
  }
  return (<div>{input}</div>);
}

export function getInitialValidation(input, meta, defaultInitialValue) {
  // eslint-disable-next-line
  if (input.value === null || input.value === undefined || ((input.value === "" && has(meta, 'error.isRequired') || input.value === defaultInitialValue))) {
    return '';
  } else {
    return 'success';
  }
}
