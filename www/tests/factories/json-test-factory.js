// Factory

var TEST_FACTORY = {

    getEnemyId: function (type) {
        switch (type) {
            case ENEMY_TYPES.Simple:
                return 1;
            case ENEMY_TYPES.NoTags:
                return 2;
            case ENEMY_TYPES.AllTags:
                return 3;
        }
    }
};