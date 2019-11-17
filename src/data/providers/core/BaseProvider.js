import util from "../../../utils/util";

class BaseProvider 
{
    static _instance;

    generateUniqueKey()
    {
        return "app_" + util.getUniqueString();
    }

}

export default BaseProvider