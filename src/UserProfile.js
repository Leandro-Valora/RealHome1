//Codice usato per indicare in sessione il nome utente
var UserProfile = (function() {
    var full_name = "";
    var Id = "";
    var typeU = "";
  
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getId = function() {
      return Id;    // Or pull this from cookie/localStorage
    };
  
    var setId = function(IdClient) {
      Id = IdClient;     
      // Also set this in cookie/localStorage
    };

    var getType = function() {
      return typeU;    // Or pull this from cookie/localStorage
    };
  
    var setType = function(typeClient) {
      typeU = typeClient;     
    };
  
    return {
      getName: getName,
      setName: setName, 
      getId: getId,
      setId: setId,
      getType: getType,
      setType: setType
    }
  
  })();
  
  export default UserProfile;