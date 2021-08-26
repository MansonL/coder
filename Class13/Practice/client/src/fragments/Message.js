import React from "react";

export default function Message ({ success, errorExist, message }){
    return (
      <React.Fragment>
        {errorExist && <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert" key="inputError">{message}
        <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close"></button>
    </div>}
    {success && <div className="alert alert-success alert-dismissible fade show mt-2" role="alert" key="inputSuccess">{message}
    <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close"></button>
</div>}
</React.Fragment>
    );
}