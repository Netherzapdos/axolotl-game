export default class MainMap
{
    map!: Phaser.Tilemaps.MapData; 

    constructor(scene: any)
    {
        const map = scene.make.tilemap({ key: 'island' });
        const tileset = map.addTilesetImage('spr_tileset_sunnysideworld', 'tiles');

        // Add layers
		const water = map.createLayer('Water', tileset);
            water.setCollisionByProperty({ collision: true }) //Set collisions
        const sand = map.createLayer('Sand', tileset); 
            sand.setCollisionByProperty({ collision: true })
        const land = map.createLayer('Land', tileset);
            land.setCollisionByProperty({ collision: true })
        map.createLayer('Dirt', tileset);
        map.createLayer('Decor', tileset);
        map.createLayer('Plots', tileset);
        map.createLayer('House', tileset);

        // Convert Tiled tiles into Matter tiles (to apply new physics)
        scene.matter.world.convertTilemapLayer(water);
        scene.matter.world.convertTilemapLayer(sand);
        scene.matter.world.convertTilemapLayer(land);
        

    // Set bounds
        scene.cameras.main.setBounds(0, 0, 992, 800) 
        scene.matter.world.setBounds(0, -5, 1005, 810)
    }
}