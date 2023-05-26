import * as env_config from "../../utils/env_config"
import update_order_cars from "../../lib/update_order_cars"

export default async function handler(req, res) {
    const result = await update_order_cars(env_config.getApiEndpoint(), req.body)

    // Return value
    return res.status(result.response_code).json(result.response_body)
}