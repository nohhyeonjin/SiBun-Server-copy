import jwt from "jsonwebtoken";

//��ū����
//sign�Լ� ������ �� payload�� ������� id�Է���
export const generateToken= id =>jwt.sign({ id }, process.env.JWT_SECRET);
