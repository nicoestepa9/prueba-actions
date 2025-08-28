
/**
 * @swagger
 * /clubs:
 *   post:
 *     summary: Create a new club
 *     description: Creates a new club with a name and nickname.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nickname
 *             properties:
 *               name:
 *                 type: string
 *                 example: FC Barcelona
 *               nickname:
 *                 type: string
 *                 example: Barça
 *     responses:
 *       201:
 *         description: Club created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: FC Barcelona
 *                 nickname:
 *                   type: string
 *                   example: Barça
 *       500:
 *         description: Internal server error
 */
app.post('/clubs', async (req, res) => {
    const { name, nickname } = req.body;
    try {
        const newClub = await prisma.club.create({
            data: {
                name,
                nickname,
            },
        });
        res.status(201).json(newClub);
    } catch (error) {
        res.status(500).json({ error: 'Error creating club' });
    }
});

/**
 * @swagger
 * /clubs:
 *   get:
 *     summary: Get all clubs
 *     description: Returns a list of all clubs.
 *     responses:
 *       200:
 *         description: A list of clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: FC Barcelona
 *                   nickname:
 *                     type: string
 *                     example: Barça
 *       500:
 *         description: Internal server error
 */
app.get('/clubs', async (req, res) => {
    try {
        const clubs = await prisma.club.findMany();
        res.status(200).json(clubs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching clubs' });
    }
});

/**
 * @swagger
 * /clubs/{id}:
 *   get:
 *     summary: Get a club by ID
 *     description: Returns a single club by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the club to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A single club
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: FC Barcelona
 *                 nickname:
 *                   type: string
 *                   example: Barça
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */
app.get('/clubs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const club = await prisma.club.findUnique({
            where: { id: parseInt(id) },
        });
        if (!club) {
            return res.status(404).json({ error: 'Club not found' });
        }
        res.status(200).json(club);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching club' });
    }
});

/**
 * @swagger
 * /clubs/{id}:
 *   put:
 *     summary: Update a club by ID
 *     description: Updates the name and nickname of a specific club.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the club to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nickname
 *             properties:
 *               name:
 *                 type: string
 *                 example: Real Madrid
 *               nickname:
 *                 type: string
 *                 example: Los Blancos
 *     responses:
 *       200:
 *         description: Club updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Real Madrid
 *                 nickname:
 *                   type: string
 *                   example: Los Blancos
 *       500:
 *         description: Internal server error
 */
app.put('/clubs/:id', async (req, res) => {
    const { id } = req.params;
    const { name, nickname } = req.body;
    try {
        const updatedClub = await prisma.club.update({
            where: { id: parseInt(id) },
            data: {
                name,
                nickname,
            },
        });
        res.status(200).json(updatedClub);
    } catch (error) {
        res.status(500).json({ error: 'Error updating club' });
    }
});

/**
 * @swagger
 * /clubs/{id}:
 *   delete:
 *     summary: Delete a club by ID
 *     description: Deletes a specific club using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the club to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Club deleted successfully (No Content)
 *       500:
 *         description: Internal server error
 */
app.delete('/clubs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.club.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting club' });
    }
});
