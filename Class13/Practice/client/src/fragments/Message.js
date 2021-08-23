import React from "react";

export default function Message (props){
    return (
      <React.Fragment>
        {props.errorExist && <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert" key="inputError">{props.message}
        <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close"></button>
    </div>}
    {props.success && <div className="alert alert-success alert-dismissible fade show mt-2" role="alert" key="inputSuccess">{props.message}
    <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close"></button>
</div>}
</React.Fragment>
    );
}