import User from '../models/User';

class MentorController {
  static async viewMentors(req, res) {
    try {
      const rows = await User.findMentors();

      const mentors = rows.map(({
        id: mentorId, first_name: firstName, last_name: lastName, email, address, occupation,
        bio, expertise, role, is_admin: isAdmin,
      }) => ({
        mentorId, firstName, lastName, email, address, occupation, bio, expertise, role, isAdmin,
      }));

      if (rows.length) {
        return res.status(200).json({
          status: 200,
          message: 'SUCCESS',
          data: mentors,
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'No mentors have been found.',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }

  static async viewSpecificMentor(req, res) {
    const { mentorId: id00 } = req.params;

    try {
      const rows = await User.findOne(id00);

      if (rows.length && rows[0].role === 'mentor') {
        const {
          id: mentorId, first_name: firstName, last_name: lastName, email, address, occupation,
          bio, expertise, role, is_admin: isAdmin,
        } = rows[0];

        return res.status(200).json({
          status: 200,
          message: 'SUCCESS',
          data: {
            mentorId,
            firstName,
            lastName,
            email,
            address,
            occupation,
            bio,
            expertise,
            role,
            isAdmin,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Mentor not found!',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }
}

export default MentorController;
